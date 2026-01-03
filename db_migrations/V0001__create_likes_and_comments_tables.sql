CREATE TABLE IF NOT EXISTS trailer_likes (
    id SERIAL PRIMARY KEY,
    user_session VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_session)
);

CREATE TABLE IF NOT EXISTS trailer_comments (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    comment_text TEXT NOT NULL,
    emoji_reaction VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_trailer_comments_created ON trailer_comments(created_at DESC);