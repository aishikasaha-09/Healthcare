const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get user dashboard data
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's reading statistics
    const readingStats = await db.get(`
      SELECT 
        COUNT(*) as totalRead,
        COUNT(CASE WHEN readAt >= date('now', '-7 days') THEN 1 END) as readThisWeek,
        COUNT(CASE WHEN readAt >= date('now', '-30 days') THEN 1 END) as readThisMonth,
        SUM(timeSpent) as totalTimeSpent
      FROM user_reading_history 
      WHERE user_id = ?
    `, [userId]);

    // Get bookmarks count
    const bookmarksCount = await db.get(`
      SELECT COUNT(*) as count 
      FROM user_bookmarks 
      WHERE user_id = ?
    `, [userId]);

    // Get recent reading history
    const recentReading = await db.query(`
      SELECT 
        a.id, a.title, a.slug, a.excerpt, a.image, a.category, a.readTime,
        urh.readAt, urh.timeSpent
      FROM user_reading_history urh
      JOIN articles a ON urh.article_id = a.id
      WHERE urh.user_id = ?
      ORDER BY urh.readAt DESC
      LIMIT 5
    `, [userId]);

    // Get reading streak (days in a row with at least one article read)
    const streakQuery = `
      WITH reading_days AS (
        SELECT DISTINCT date(readAt) as read_date
        FROM user_reading_history
        WHERE user_id = ?
        ORDER BY read_date DESC
      ),
      streak_calc AS (
        SELECT 
          read_date,
          ROW_NUMBER() OVER (ORDER BY read_date DESC) as row_num,
          julianday(read_date) as julian_date,
          julianday('now') as today_julian
        FROM reading_days
      )
      SELECT COUNT(*) as streak
      FROM streak_calc
      WHERE julian_date >= (today_julian - row_num)
    `;
    
    const streakResult = await db.get(streakQuery, [userId]);

    res.json({
      dashboard: {
        reading: {
          totalRead: readingStats.totalRead || 0,
          readThisWeek: readingStats.readThisWeek || 0,
          readThisMonth: readingStats.readThisMonth || 0,
          totalTimeSpent: readingStats.totalTimeSpent || 0,
          streak: streakResult.streak || 0
        },
        bookmarks: bookmarksCount.count || 0,
        recentReading: recentReading || []
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ error: 'Failed to get dashboard data' });
  }
});

// Get user's reading history
router.get('/reading-history', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const totalQuery = `
      SELECT COUNT(*) as total
      FROM user_reading_history urh
      WHERE urh.user_id = ?
    `;
    const total = await db.get(totalQuery, [req.user.id]);

    const historyQuery = `
      SELECT 
        a.id, a.title, a.slug, a.excerpt, a.image, a.category, a.readTime,
        urh.readAt, urh.timeSpent
      FROM user_reading_history urh
      JOIN articles a ON urh.article_id = a.id
      WHERE urh.user_id = ?
      ORDER BY urh.readAt DESC
      LIMIT ? OFFSET ?
    `;

    const history = await db.query(historyQuery, [req.user.id, limit, offset]);

    res.json({
      history,
      pagination: {
        page,
        limit,
        total: total.total,
        pages: Math.ceil(total.total / limit)
      }
    });
  } catch (error) {
    console.error('Get reading history error:', error);
    res.status(500).json({ error: 'Failed to get reading history' });
  }
});

// Track reading time
router.post('/track-reading', authMiddleware, [
  body('articleId').isInt().withMessage('Valid article ID is required'),
  body('timeSpent').isInt({ min: 0 }).withMessage('Time spent must be a positive number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { articleId, timeSpent } = req.body;

    // Update reading history with time spent
    await db.run(`
      INSERT INTO user_reading_history (user_id, article_id, timeSpent, readAt)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(user_id, article_id) DO UPDATE SET
        timeSpent = timeSpent + excluded.timeSpent,
        readAt = CURRENT_TIMESTAMP
    `, [req.user.id, articleId, timeSpent]);

    res.json({ message: 'Reading time tracked successfully' });
  } catch (error) {
    console.error('Track reading error:', error);
    res.status(500).json({ error: 'Failed to track reading time' });
  }
});

// Get user preferences
router.get('/preferences', authMiddleware, async (req, res) => {
  try {
    // For now, we'll return default preferences
    // In a real app, you'd have a preferences table
    const preferences = {
      emailNotifications: true,
      weeklyDigest: true,
      favoriteCategories: ['psychology', 'neuroscience', 'mental-health'],
      readingGoal: 5, // articles per week
      theme: 'light'
    };

    res.json({ preferences });
  } catch (error) {
    console.error('Get preferences error:', error);
    res.status(500).json({ error: 'Failed to get user preferences' });
  }
});

// Update user preferences
router.put('/preferences', authMiddleware, [
  body('emailNotifications').optional().isBoolean().withMessage('Email notifications must be boolean'),
  body('weeklyDigest').optional().isBoolean().withMessage('Weekly digest must be boolean'),
  body('favoriteCategories').optional().isArray().withMessage('Favorite categories must be an array'),
  body('readingGoal').optional().isInt({ min: 1, max: 50 }).withMessage('Reading goal must be between 1 and 50'),
  body('theme').optional().isIn(['light', 'dark']).withMessage('Theme must be light or dark')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // In a real app, you'd save these to a preferences table
    // For now, we'll just return success
    res.json({ message: 'Preferences updated successfully' });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

// Get user achievements
router.get('/achievements', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get reading statistics for achievements
    const stats = await db.get(`
      SELECT 
        COUNT(*) as totalRead,
        SUM(timeSpent) as totalTimeSpent,
        COUNT(CASE WHEN readAt >= date('now', '-7 days') THEN 1 END) as readThisWeek,
        MIN(readAt) as firstRead
      FROM user_reading_history 
      WHERE user_id = ?
    `, [userId]);

    const bookmarksCount = await db.get(`
      SELECT COUNT(*) as count 
      FROM user_bookmarks 
      WHERE user_id = ?
    `, [userId]);

    // Calculate achievements
    const achievements = [];

    if (stats.totalRead >= 1) {
      achievements.push({
        id: 'first-read',
        name: 'First Steps',
        description: 'Read your first article',
        icon: '📚',
        earned: true,
        earnedAt: stats.firstRead
      });
    }

    if (stats.totalRead >= 10) {
      achievements.push({
        id: 'bookworm',
        name: 'Bookworm',
        description: 'Read 10 articles',
        icon: '🐛',
        earned: true
      });
    }

    if (stats.totalRead >= 50) {
      achievements.push({
        id: 'scholar',
        name: 'Scholar',
        description: 'Read 50 articles',
        icon: '🎓',
        earned: true
      });
    }

    if (stats.readThisWeek >= 7) {
      achievements.push({
        id: 'weekly-reader',
        name: 'Weekly Reader',
        description: 'Read 7 articles this week',
        icon: '📅',
        earned: true
      });
    }

    if (bookmarksCount.count >= 5) {
      achievements.push({
        id: 'collector',
        name: 'Collector',
        description: 'Bookmark 5 articles',
        icon: '🔖',
        earned: true
      });
    }

    res.json({ achievements });
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ error: 'Failed to get achievements' });
  }
});

module.exports = router;