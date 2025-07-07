const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const db = require('../config/database');

async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database with sample data...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.run(`
      INSERT OR IGNORE INTO users (username, email, password, firstName, lastName, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `, ['admin', 'admin@briefpsych.com', hashedPassword, 'Admin', 'User', 'admin']);

    // Create sample user
    const userPassword = await bcrypt.hash('user123', 10);
    await db.run(`
      INSERT OR IGNORE INTO users (username, email, password, firstName, lastName)
      VALUES (?, ?, ?, ?, ?)
    `, ['johnsmith', 'john@example.com', userPassword, 'John', 'Smith']);

    // Add sample articles
    const sampleArticles = [
      {
        title: 'Understanding Cognitive Behavioral Therapy',
        slug: 'understanding-cognitive-behavioral-therapy',
        excerpt: 'Learn about CBT techniques and how they can help with anxiety and depression.',
        content: `
          <h2>What is Cognitive Behavioral Therapy?</h2>
          <p>Cognitive Behavioral Therapy (CBT) is a widely used therapeutic approach that focuses on identifying and changing negative thought patterns and behaviors.</p>
          
          <h3>Key Principles of CBT</h3>
          <ul>
            <li>Thoughts, feelings, and behaviors are interconnected</li>
            <li>Changing negative thought patterns can improve emotional well-being</li>
            <li>Present-focused approach to problem-solving</li>
            <li>Collaborative relationship between therapist and client</li>
          </ul>
          
          <h3>Common CBT Techniques</h3>
          <p>CBT therapists use various techniques including:</p>
          <ul>
            <li>Cognitive restructuring</li>
            <li>Behavioral activation</li>
            <li>Exposure therapy</li>
            <li>Mindfulness techniques</li>
          </ul>
          
          <p>Research shows that CBT is effective for treating anxiety disorders, depression, PTSD, and many other mental health conditions.</p>
        `,
        image: 'https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'therapy',
        tags: 'CBT,therapy,mental health,anxiety,depression',
        author_id: 1,
        featured: 1,
        readTime: 5
      },
      {
        title: 'The Science of Mindfulness and Meditation',
        slug: 'science-of-mindfulness-and-meditation',
        excerpt: 'Explore the neuroscience behind mindfulness practices and their mental health benefits.',
        content: `
          <h2>Understanding Mindfulness</h2>
          <p>Mindfulness is the practice of maintaining moment-to-moment awareness of our thoughts, feelings, bodily sensations, and surrounding environment.</p>
          
          <h3>Neuroscience of Mindfulness</h3>
          <p>Research using brain imaging shows that mindfulness practice can lead to:</p>
          <ul>
            <li>Increased gray matter density in areas associated with learning and memory</li>
            <li>Reduced amygdala reactivity to stress</li>
            <li>Enhanced prefrontal cortex function</li>
            <li>Improved emotional regulation</li>
          </ul>
          
          <h3>Benefits of Regular Practice</h3>
          <ul>
            <li>Reduced stress and anxiety</li>
            <li>Improved focus and attention</li>
            <li>Better emotional regulation</li>
            <li>Enhanced self-awareness</li>
            <li>Improved sleep quality</li>
          </ul>
          
          <p>Studies show that just 8 weeks of mindfulness practice can lead to measurable changes in brain structure and function.</p>
        `,
        image: 'https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'mindfulness',
        tags: 'mindfulness,meditation,neuroscience,stress,mental health',
        author_id: 1,
        featured: 1,
        readTime: 4
      },
      {
        title: 'Building Healthy Habits: A Psychological Approach',
        slug: 'building-healthy-habits-psychological-approach',
        excerpt: 'Discover evidence-based strategies for creating lasting positive changes in your life.',
        content: `
          <h2>The Psychology of Habit Formation</h2>
          <p>Habits are automatic behaviors that are triggered by environmental cues and followed by rewards.</p>
          
          <h3>The Habit Loop</h3>
          <p>Every habit consists of three components:</p>
          <ol>
            <li><strong>Cue:</strong> The trigger that initiates the behavior</li>
            <li><strong>Routine:</strong> The behavior itself</li>
            <li><strong>Reward:</strong> The benefit you gain from the behavior</li>
          </ol>
          
          <h3>Strategies for Building Healthy Habits</h3>
          <ul>
            <li>Start small and gradually increase intensity</li>
            <li>Stack new habits onto existing ones</li>
            <li>Design your environment to support the habit</li>
            <li>Track your progress</li>
            <li>Be patient with yourself</li>
          </ul>
          
          <h3>Common Mistakes to Avoid</h3>
          <ul>
            <li>Trying to change too many habits at once</li>
            <li>Setting unrealistic expectations</li>
            <li>Focusing on outcomes rather than the process</li>
            <li>Giving up after a few setbacks</li>
          </ul>
          
          <p>Research shows it takes an average of 66 days to form a new habit, but this can vary significantly depending on the complexity of the behavior.</p>
        `,
        image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'habits',
        tags: 'habits,behavior change,psychology,self-improvement',
        author_id: 1,
        featured: 0,
        readTime: 6
      },
      {
        title: 'Social Psychology: Understanding Human Behavior',
        slug: 'social-psychology-understanding-human-behavior',
        excerpt: 'Explore how social situations influence our thoughts, feelings, and behaviors.',
        content: `
          <h2>What is Social Psychology?</h2>
          <p>Social psychology is the scientific study of how people think, feel, and behave in social situations.</p>
          
          <h3>Key Concepts in Social Psychology</h3>
          <ul>
            <li><strong>Social Influence:</strong> How others affect our behavior</li>
            <li><strong>Social Cognition:</strong> How we process social information</li>
            <li><strong>Group Dynamics:</strong> How groups function and influence members</li>
            <li><strong>Interpersonal Relationships:</strong> How we form and maintain relationships</li>
          </ul>
          
          <h3>Famous Social Psychology Experiments</h3>
          <ul>
            <li>Milgram's obedience experiments</li>
            <li>Asch's conformity studies</li>
            <li>Stanford Prison Experiment</li>
            <li>Bystander effect research</li>
          </ul>
          
          <h3>Applications in Daily Life</h3>
          <p>Understanding social psychology can help us:</p>
          <ul>
            <li>Improve our relationships</li>
            <li>Make better decisions in groups</li>
            <li>Recognize and overcome biases</li>
            <li>Communicate more effectively</li>
          </ul>
          
          <p>Social psychology research continues to provide insights into human behavior and social interaction.</p>
        `,
        image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'social',
        tags: 'social psychology,behavior,relationships,influence',
        author_id: 1,
        featured: 0,
        readTime: 7
      },
      {
        title: 'The Psychology of Learning and Memory',
        slug: 'psychology-of-learning-and-memory',
        excerpt: 'Understanding how we learn and remember information can improve your study habits.',
        content: `
          <h2>How Memory Works</h2>
          <p>Memory is the process of encoding, storing, and retrieving information. It involves three main stages:</p>
          
          <h3>Types of Memory</h3>
          <ul>
            <li><strong>Sensory Memory:</strong> Brief retention of sensory information</li>
            <li><strong>Short-term Memory:</strong> Temporary storage of information</li>
            <li><strong>Long-term Memory:</strong> Permanent storage of information</li>
          </ul>
          
          <h3>Effective Learning Strategies</h3>
          <ul>
            <li>Spaced repetition</li>
            <li>Active recall</li>
            <li>Elaborative interrogation</li>
            <li>Distributed practice</li>
            <li>Interleaving</li>
          </ul>
          
          <h3>Memory Enhancement Techniques</h3>
          <ul>
            <li>Mnemonics and memory palaces</li>
            <li>Chunking information</li>
            <li>Visual imagery</li>
            <li>Creating meaningful connections</li>
          </ul>
          
          <p>Research shows that understanding how memory works can significantly improve learning outcomes and retention.</p>
        `,
        image: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'cognitive',
        tags: 'memory,learning,cognition,study techniques',
        author_id: 1,
        featured: 0,
        readTime: 5
      }
    ];

    for (const article of sampleArticles) {
      await db.run(`
        INSERT OR IGNORE INTO articles (title, slug, excerpt, content, image, category, tags, author_id, featured, readTime)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        article.title, article.slug, article.excerpt, article.content,
        article.image, article.category, article.tags, article.author_id,
        article.featured, article.readTime
      ]);
    }

    // Add sample newsletter subscribers
    const sampleSubscribers = [
      ['jane@example.com', 'Jane', 'Doe'],
      ['bob@example.com', 'Bob', 'Johnson'],
      ['alice@example.com', 'Alice', 'Wilson'],
      ['charlie@example.com', 'Charlie', 'Brown']
    ];

    for (const subscriber of sampleSubscribers) {
      await db.run(`
        INSERT OR IGNORE INTO newsletter_subscribers (email, firstName, lastName)
        VALUES (?, ?, ?)
      `, subscriber);
    }

    console.log('✅ Database initialized successfully!');
    console.log('📊 Sample data created:');
    console.log('  - Admin user: admin@briefpsych.com (password: admin123)');
    console.log('  - Sample user: john@example.com (password: user123)');
    console.log('  - 5 sample articles');
    console.log('  - 4 sample newsletter subscribers');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();