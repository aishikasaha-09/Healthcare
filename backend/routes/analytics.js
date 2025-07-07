const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { authMiddleware, adminMiddleware, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Track user events
router.post('/track', optionalAuth, [
  body('eventType').isIn(['page_view', 'article_view', 'search', 'click', 'scroll', 'time_on_page']).withMessage('Invalid event type'),
  body('eventData').optional().isObject().withMessage('Event data must be an object')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { eventType, eventData } = req.body;
    const userId = req.user ? req.user.id : null;
    const ipAddress = req.ip;
    const userAgent = req.get('User-Agent');

    await db.run(`
      INSERT INTO analytics (event_type, event_data, user_id, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?)
    `, [eventType, JSON.stringify(eventData), userId, ipAddress, userAgent]);

    res.json({ message: 'Event tracked successfully' });
  } catch (error) {
    console.error('Track event error:', error);
    res.status(500).json({ error: 'Failed to track event' });
  }
});

// Get analytics dashboard (admin only)
router.get('/dashboard', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const timeRange = req.query.range || '7d'; // 7d, 30d, 90d
    
    let dateFilter = '';
    switch(timeRange) {
      case '7d':
        dateFilter = "timestamp >= date('now', '-7 days')";
        break;
      case '30d':
        dateFilter = "timestamp >= date('now', '-30 days')";
        break;
      case '90d':
        dateFilter = "timestamp >= date('now', '-90 days')";
        break;
      default:
        dateFilter = "timestamp >= date('now', '-7 days')";
    }

    // Get page views
    const pageViews = await db.get(`
      SELECT COUNT(*) as count
      FROM analytics
      WHERE event_type = 'page_view' AND ${dateFilter}
    `);

    // Get unique visitors
    const uniqueVisitors = await db.get(`
      SELECT COUNT(DISTINCT ip_address) as count
      FROM analytics
      WHERE ${dateFilter}
    `);

    // Get top articles
    const topArticles = await db.query(`
      SELECT 
        JSON_EXTRACT(event_data, '$.articleId') as article_id,
        JSON_EXTRACT(event_data, '$.title') as title,
        COUNT(*) as views
      FROM analytics
      WHERE event_type = 'article_view' AND ${dateFilter}
      GROUP BY article_id
      ORDER BY views DESC
      LIMIT 10
    `);

    // Get daily page views
    const dailyViews = await db.query(`
      SELECT 
        date(timestamp) as date,
        COUNT(*) as views
      FROM analytics
      WHERE event_type = 'page_view' AND ${dateFilter}
      GROUP BY date(timestamp)
      ORDER BY date
    `);

    // Get popular search terms
    const popularSearches = await db.query(`
      SELECT 
        JSON_EXTRACT(event_data, '$.query') as query,
        COUNT(*) as count
      FROM analytics
      WHERE event_type = 'search' AND ${dateFilter}
      GROUP BY query
      ORDER BY count DESC
      LIMIT 10
    `);

    // Get device/browser stats
    const deviceStats = await db.query(`
      SELECT 
        CASE 
          WHEN user_agent LIKE '%Mobile%' THEN 'Mobile'
          WHEN user_agent LIKE '%Tablet%' THEN 'Tablet'
          ELSE 'Desktop'
        END as device_type,
        COUNT(*) as count
      FROM analytics
      WHERE ${dateFilter}
      GROUP BY device_type
    `);

    res.json({
      dashboard: {
        summary: {
          pageViews: pageViews.count || 0,
          uniqueVisitors: uniqueVisitors.count || 0,
          timeRange
        },
        topArticles,
        dailyViews,
        popularSearches,
        deviceStats
      }
    });
  } catch (error) {
    console.error('Get analytics dashboard error:', error);
    res.status(500).json({ error: 'Failed to get analytics dashboard' });
  }
});

// Get article performance (admin only)
router.get('/articles/:id/performance', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const timeRange = req.query.range || '30d';
    
    let dateFilter = '';
    switch(timeRange) {
      case '7d':
        dateFilter = "timestamp >= date('now', '-7 days')";
        break;
      case '30d':
        dateFilter = "timestamp >= date('now', '-30 days')";
        break;
      case '90d':
        dateFilter = "timestamp >= date('now', '-90 days')";
        break;
      default:
        dateFilter = "timestamp >= date('now', '-30 days')";
    }

    // Get article views over time
    const viewsOverTime = await db.query(`
      SELECT 
        date(timestamp) as date,
        COUNT(*) as views
      FROM analytics
      WHERE event_type = 'article_view' 
        AND JSON_EXTRACT(event_data, '$.articleId') = ?
        AND ${dateFilter}
      GROUP BY date(timestamp)
      ORDER BY date
    `, [id]);

    // Get total metrics
    const totalViews = await db.get(`
      SELECT COUNT(*) as count
      FROM analytics
      WHERE event_type = 'article_view' 
        AND JSON_EXTRACT(event_data, '$.articleId') = ?
        AND ${dateFilter}
    `, [id]);

    // Get average time on page
    const avgTimeOnPage = await db.get(`
      SELECT AVG(CAST(JSON_EXTRACT(event_data, '$.timeSpent') AS INTEGER)) as avg_time
      FROM analytics
      WHERE event_type = 'time_on_page' 
        AND JSON_EXTRACT(event_data, '$.articleId') = ?
        AND ${dateFilter}
    `, [id]);

    // Get scroll depth
    const scrollDepth = await db.query(`
      SELECT 
        JSON_EXTRACT(event_data, '$.scrollDepth') as depth,
        COUNT(*) as count
      FROM analytics
      WHERE event_type = 'scroll' 
        AND JSON_EXTRACT(event_data, '$.articleId') = ?
        AND ${dateFilter}
      GROUP BY depth
      ORDER BY depth
    `, [id]);

    res.json({
      performance: {
        totalViews: totalViews.count || 0,
        avgTimeOnPage: avgTimeOnPage.avg_time || 0,
        viewsOverTime,
        scrollDepth,
        timeRange
      }
    });
  } catch (error) {
    console.error('Get article performance error:', error);
    res.status(500).json({ error: 'Failed to get article performance' });
  }
});

// Get user engagement metrics (admin only)
router.get('/engagement', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const timeRange = req.query.range || '30d';
    
    let dateFilter = '';
    switch(timeRange) {
      case '7d':
        dateFilter = "timestamp >= date('now', '-7 days')";
        break;
      case '30d':
        dateFilter = "timestamp >= date('now', '-30 days')";
        break;
      case '90d':
        dateFilter = "timestamp >= date('now', '-90 days')";
        break;
      default:
        dateFilter = "timestamp >= date('now', '-30 days')";
    }

    // Get bounce rate (users who view only one page)
    const bounceRate = await db.get(`
      SELECT 
        COUNT(CASE WHEN page_count = 1 THEN 1 END) * 100.0 / COUNT(*) as bounce_rate
      FROM (
        SELECT 
          ip_address,
          COUNT(*) as page_count
        FROM analytics
        WHERE event_type = 'page_view' AND ${dateFilter}
        GROUP BY ip_address
      ) user_sessions
    `);

    // Get average session duration
    const avgSessionDuration = await db.get(`
      SELECT AVG(CAST(JSON_EXTRACT(event_data, '$.timeSpent') AS INTEGER)) as avg_duration
      FROM analytics
      WHERE event_type = 'time_on_page' AND ${dateFilter}
    `);

    // Get pages per session
    const pagesPerSession = await db.get(`
      SELECT AVG(page_count) as avg_pages
      FROM (
        SELECT 
          ip_address,
          COUNT(*) as page_count
        FROM analytics
        WHERE event_type = 'page_view' AND ${dateFilter}
        GROUP BY ip_address
      ) user_sessions
    `);

    // Get returning vs new visitors
    const visitorTypes = await db.query(`
      SELECT 
        CASE 
          WHEN first_visit = last_visit THEN 'New'
          ELSE 'Returning'
        END as visitor_type,
        COUNT(*) as count
      FROM (
        SELECT 
          ip_address,
          MIN(date(timestamp)) as first_visit,
          MAX(date(timestamp)) as last_visit
        FROM analytics
        WHERE ${dateFilter}
        GROUP BY ip_address
      ) visitor_analysis
      GROUP BY visitor_type
    `);

    res.json({
      engagement: {
        bounceRate: bounceRate.bounce_rate || 0,
        avgSessionDuration: avgSessionDuration.avg_duration || 0,
        pagesPerSession: pagesPerSession.avg_pages || 0,
        visitorTypes,
        timeRange
      }
    });
  } catch (error) {
    console.error('Get engagement metrics error:', error);
    res.status(500).json({ error: 'Failed to get engagement metrics' });
  }
});

module.exports = router;