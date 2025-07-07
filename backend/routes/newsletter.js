const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('firstName').optional().trim().isLength({ min: 1 }).withMessage('First name cannot be empty'),
  body('lastName').optional().trim().isLength({ min: 1 }).withMessage('Last name cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, firstName, lastName, preferences } = req.body;

    // Check if already subscribed
    const existingSubscriber = await db.get(
      'SELECT * FROM newsletter_subscribers WHERE email = ?',
      [email]
    );

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(400).json({ error: 'Email already subscribed' });
      } else {
        // Reactivate subscription
        await db.run(
          'UPDATE newsletter_subscribers SET isActive = 1, firstName = ?, lastName = ?, preferences = ?, subscribedAt = CURRENT_TIMESTAMP, unsubscribedAt = NULL WHERE email = ?',
          [firstName, lastName, preferences, email]
        );
        return res.json({ message: 'Welcome back! Your subscription has been reactivated.' });
      }
    }

    // Create new subscription
    await db.run(
      'INSERT INTO newsletter_subscribers (email, firstName, lastName, preferences) VALUES (?, ?, ?, ?)',
      [email, firstName, lastName, preferences]
    );

    // Here you would typically send a welcome email
    // await sendWelcomeEmail(email, firstName);

    res.status(201).json({ 
      message: 'Successfully subscribed to newsletter!',
      email: email
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Failed to subscribe to newsletter' });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    const result = await db.run(
      'UPDATE newsletter_subscribers SET isActive = 0, unsubscribedAt = CURRENT_TIMESTAMP WHERE email = ? AND isActive = 1',
      [email]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Email not found in our subscription list' });
    }

    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    res.status(500).json({ error: 'Failed to unsubscribe from newsletter' });
  }
});

// Get subscription status
router.get('/status/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const subscriber = await db.get(
      'SELECT isActive, subscribedAt FROM newsletter_subscribers WHERE email = ?',
      [email]
    );

    if (!subscriber) {
      return res.json({ subscribed: false });
    }

    res.json({ 
      subscribed: subscriber.isActive,
      subscribedAt: subscriber.subscribedAt
    });
  } catch (error) {
    console.error('Get subscription status error:', error);
    res.status(500).json({ error: 'Failed to get subscription status' });
  }
});

// Get all subscribers (admin only)
router.get('/subscribers', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;
    const activeOnly = req.query.active === 'true';

    let whereClause = '';
    let params = [];

    if (activeOnly) {
      whereClause = 'WHERE isActive = 1';
    }

    const countQuery = `SELECT COUNT(*) as total FROM newsletter_subscribers ${whereClause}`;
    const total = await db.get(countQuery, params);

    const subscribersQuery = `
      SELECT email, firstName, lastName, isActive, subscribedAt, unsubscribedAt
      FROM newsletter_subscribers
      ${whereClause}
      ORDER BY subscribedAt DESC
      LIMIT ? OFFSET ?
    `;

    const subscribers = await db.query(subscribersQuery, [...params, limit, offset]);

    res.json({
      subscribers,
      pagination: {
        page,
        limit,
        total: total.total,
        pages: Math.ceil(total.total / limit)
      }
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ error: 'Failed to get subscribers' });
  }
});

// Get newsletter statistics (admin only)
router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const stats = await db.query(`
      SELECT 
        COUNT(*) as totalSubscribers,
        SUM(CASE WHEN isActive = 1 THEN 1 ELSE 0 END) as activeSubscribers,
        SUM(CASE WHEN isActive = 0 THEN 1 ELSE 0 END) as inactiveSubscribers,
        COUNT(CASE WHEN subscribedAt >= date('now', '-7 days') THEN 1 END) as newThisWeek,
        COUNT(CASE WHEN subscribedAt >= date('now', '-30 days') THEN 1 END) as newThisMonth
      FROM newsletter_subscribers
    `);

    res.json({ stats: stats[0] });
  } catch (error) {
    console.error('Get newsletter stats error:', error);
    res.status(500).json({ error: 'Failed to get newsletter statistics' });
  }
});

// Update subscriber preferences
router.put('/preferences', [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('preferences').optional().isString().withMessage('Preferences must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, preferences, firstName, lastName } = req.body;

    const result = await db.run(
      'UPDATE newsletter_subscribers SET preferences = ?, firstName = ?, lastName = ? WHERE email = ? AND isActive = 1',
      [preferences, firstName, lastName, email]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Active subscription not found' });
    }

    res.json({ message: 'Preferences updated successfully' });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

module.exports = router;