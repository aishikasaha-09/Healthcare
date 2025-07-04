const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { authMiddleware, adminMiddleware, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get all articles (with pagination and filtering)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const category = req.query.category;
    const search = req.query.search;
    const featured = req.query.featured === 'true';

    let whereClause = 'WHERE status = "published"';
    let params = [];

    if (category) {
      whereClause += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      whereClause += ' AND (title LIKE ? OR content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (featured) {
      whereClause += ' AND featured = 1';
    }

    const countQuery = `SELECT COUNT(*) as total FROM articles ${whereClause}`;
    const total = await db.get(countQuery, params);

    const articlesQuery = `
      SELECT 
        a.id, a.title, a.slug, a.excerpt, a.image, a.category, a.tags, 
        a.views, a.likes, a.readTime, a.featured, a.createdAt,
        u.firstName, u.lastName, u.username as authorUsername
      FROM articles a
      LEFT JOIN users u ON a.author_id = u.id
      ${whereClause}
      ORDER BY a.createdAt DESC
      LIMIT ? OFFSET ?
    `;

    const articles = await db.query(articlesQuery, [...params, limit, offset]);

    res.json({
      articles,
      pagination: {
        page,
        limit,
        total: total.total,
        pages: Math.ceil(total.total / limit)
      }
    });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ error: 'Failed to get articles' });
  }
});

// Get single article by slug
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const { slug } = req.params;

    const article = await db.get(`
      SELECT 
        a.*, 
        u.firstName, u.lastName, u.username as authorUsername, u.avatar as authorAvatar
      FROM articles a
      LEFT JOIN users u ON a.author_id = u.id
      WHERE a.slug = ? AND a.status = "published"
    `, [slug]);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Increment view count
    await db.run('UPDATE articles SET views = views + 1 WHERE id = ?', [article.id]);
    article.views += 1;

    // Check if user has bookmarked this article
    let isBookmarked = false;
    if (req.user) {
      const bookmark = await db.get(
        'SELECT 1 FROM user_bookmarks WHERE user_id = ? AND article_id = ?',
        [req.user.id, article.id]
      );
      isBookmarked = !!bookmark;

      // Track reading history
      await db.run(
        'INSERT OR REPLACE INTO user_reading_history (user_id, article_id, readAt) VALUES (?, ?, CURRENT_TIMESTAMP)',
        [req.user.id, article.id]
      );
    }

    res.json({
      article: {
        ...article,
        tags: article.tags ? article.tags.split(',') : [],
        isBookmarked
      }
    });
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({ error: 'Failed to get article' });
  }
});

// Create new article (admin only)
router.post('/', authMiddleware, adminMiddleware, [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('content').trim().isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  body('category').trim().isLength({ min: 1 }).withMessage('Category is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, excerpt, image, category, tags, featured, readTime } = req.body;
    
    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const result = await db.run(`
      INSERT INTO articles (title, slug, content, excerpt, image, category, tags, author_id, featured, readTime)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [title, slug, content, excerpt, image, category, tags, req.user.id, featured || 0, readTime || 3]);

    res.status(201).json({
      message: 'Article created successfully',
      article: {
        id: result.id,
        title,
        slug,
        category,
        featured: featured || 0
      }
    });
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// Update article (admin only)
router.put('/:id', authMiddleware, adminMiddleware, [
  body('title').optional().trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('content').optional().trim().isLength({ min: 10 }).withMessage('Content must be at least 10 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, content, excerpt, image, category, tags, featured, readTime, status } = req.body;

    const updates = {};
    const values = [];

    if (title !== undefined) {
      updates.title = title;
      updates.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      values.push(title, updates.slug);
    }
    if (content !== undefined) {
      updates.content = content;
      values.push(content);
    }
    if (excerpt !== undefined) {
      updates.excerpt = excerpt;
      values.push(excerpt);
    }
    if (image !== undefined) {
      updates.image = image;
      values.push(image);
    }
    if (category !== undefined) {
      updates.category = category;
      values.push(category);
    }
    if (tags !== undefined) {
      updates.tags = tags;
      values.push(tags);
    }
    if (featured !== undefined) {
      updates.featured = featured;
      values.push(featured);
    }
    if (readTime !== undefined) {
      updates.readTime = readTime;
      values.push(readTime);
    }
    if (status !== undefined) {
      updates.status = status;
      values.push(status);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    values.push(id);

    await db.run(
      `UPDATE articles SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      values
    );

    res.json({ message: 'Article updated successfully' });
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// Delete article (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.run('DELETE FROM articles WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// Like/Unlike article
router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if article exists
    const article = await db.get('SELECT * FROM articles WHERE id = ?', [id]);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // For simplicity, we'll just increment likes
    // In a real app, you'd track individual user likes
    await db.run('UPDATE articles SET likes = likes + 1 WHERE id = ?', [id]);

    res.json({ message: 'Article liked successfully' });
  } catch (error) {
    console.error('Like article error:', error);
    res.status(500).json({ error: 'Failed to like article' });
  }
});

// Bookmark/Unbookmark article
router.post('/:id/bookmark', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if article exists
    const article = await db.get('SELECT * FROM articles WHERE id = ?', [id]);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Check if already bookmarked
    const existing = await db.get(
      'SELECT * FROM user_bookmarks WHERE user_id = ? AND article_id = ?',
      [req.user.id, id]
    );

    if (existing) {
      // Remove bookmark
      await db.run(
        'DELETE FROM user_bookmarks WHERE user_id = ? AND article_id = ?',
        [req.user.id, id]
      );
      res.json({ message: 'Bookmark removed', bookmarked: false });
    } else {
      // Add bookmark
      await db.run(
        'INSERT INTO user_bookmarks (user_id, article_id) VALUES (?, ?)',
        [req.user.id, id]
      );
      res.json({ message: 'Article bookmarked', bookmarked: true });
    }
  } catch (error) {
    console.error('Bookmark article error:', error);
    res.status(500).json({ error: 'Failed to bookmark article' });
  }
});

// Get user's bookmarks
router.get('/user/bookmarks', authMiddleware, async (req, res) => {
  try {
    const bookmarks = await db.query(`
      SELECT 
        a.id, a.title, a.slug, a.excerpt, a.image, a.category, a.readTime, a.createdAt,
        ub.createdAt as bookmarkedAt
      FROM user_bookmarks ub
      JOIN articles a ON ub.article_id = a.id
      WHERE ub.user_id = ?
      ORDER BY ub.createdAt DESC
    `, [req.user.id]);

    res.json({ bookmarks });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ error: 'Failed to get bookmarks' });
  }
});

module.exports = router;