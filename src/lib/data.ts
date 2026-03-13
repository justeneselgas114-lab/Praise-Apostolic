import { Ministry, Pastor, Sermon, ChurchEvent } from './types';

export const PASTORS: Pastor[] = [
  {
    id: '1',
    name: 'Dr. Samuel Thompson',
    role: 'Senior Pastor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    shortBio: 'Leading with grace and truth for over 20 years, Dr. Thompson is passionate about expository preaching.'
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    role: 'Worship Pastor',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
    shortBio: 'Sarah leads our congregation into the presence of God through heartfelt worship and musical excellence.'
  },
  {
    id: '3',
    name: 'Marcus Rivera',
    role: 'Youth & Discipleship',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    shortBio: 'Marcus is dedicated to mentoring the next generation and building strong foundations of faith.'
  }
];

export const MINISTRIES: Ministry[] = [
  {
    id: 'youth',
    name: 'Youth Ministry',
    description: 'Empowering teens to live out their faith in a modern world.',
    schedule: 'Fridays at 7:00 PM',
    leader: 'Marcus Rivera',
    icon: 'Zap'
  },
  {
    id: 'children',
    name: 'Children\'s Ministry (Seeds)',
    description: 'Planting the Word of God in young hearts through fun and engaging lessons.',
    schedule: 'Sundays at 10:30 AM',
    leader: 'Maria Thompson',
    icon: 'Sprout'
  },
  {
    id: 'music',
    name: 'Music Team',
    description: 'Leading the congregation into the presence of God through heartfelt worship.',
    schedule: 'Thursdays at 6:30 PM',
    leader: 'Sarah Jenkins',
    icon: 'Music'
  },
  {
    id: 'outreach',
    name: 'Outreach',
    description: 'Being the hands and feet of Jesus in our local community.',
    schedule: 'Saturdays at 10:00 AM',
    leader: 'David Chen',
    icon: 'Globe'
  },
  {
    id: 'prayer',
    name: 'Prayer Team',
    description: 'Dedicated to interceding for the needs of our church and community.',
    schedule: 'Wednesdays at 6:00 PM',
    leader: 'Pastor Samuel Thompson',
    icon: 'MessageSquare'
  }
];

export const EVENTS: ChurchEvent[] = [
  {
    id: '1',
    title: 'Monthly Fellowship Dinner',
    date: 'March 15, 2026',
    time: '6:00 PM',
    location: 'Church Hall',
    description: 'Join us for a time of food, fellowship, and community building.',
    image: 'https://images.unsplash.com/photo-1510154221590-ff63e90a136f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Youth Night Out',
    date: 'March 20, 2026',
    time: '7:00 PM',
    location: 'Pentecost City Park',
    description: 'A fun night of games and worship for all our youth.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop'
  }
];

export const SERMONS: Sermon[] = [
  {
    id: '1',
    title: 'Walking in the Light',
    scripture: '1 John 1:5-10',
    date: 'March 2, 2026',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'The Power of Prayer',
    scripture: 'James 5:16',
    date: 'February 23, 2026',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1200&auto=format&fit=crop'
  }
];

export const LATEST_SERMON: Sermon = SERMONS[0];
