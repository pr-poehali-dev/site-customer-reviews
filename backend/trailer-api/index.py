import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для работы с лайками и комментариями к трейлеру'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    
    try:
        if method == 'GET':
            path = event.get('queryStringParameters', {}).get('action', 'stats')
            
            if path == 'stats':
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT COUNT(*) as count FROM trailer_likes")
                    likes = cur.fetchone()['count']
                    
                    cur.execute("""
                        SELECT id, user_name, comment_text, emoji_reaction, 
                               created_at::text as created_at
                        FROM trailer_comments 
                        ORDER BY created_at DESC
                    """)
                    comments = cur.fetchall()
                    
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'likes': likes,
                        'comments': comments
                    }),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'like':
                user_session = body.get('userSession')
                
                with conn.cursor() as cur:
                    cur.execute(
                        "INSERT INTO trailer_likes (user_session) VALUES (%s) ON CONFLICT (user_session) DO NOTHING",
                        (user_session,)
                    )
                    conn.commit()
                    
                    cur.execute("SELECT COUNT(*) as count FROM trailer_likes")
                    likes = cur.fetchone()[0]
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'likes': likes}),
                    'isBase64Encoded': False
                }
            
            elif action == 'comment':
                user_name = body.get('userName')
                comment_text = body.get('commentText')
                emoji_reaction = body.get('emojiReaction')
                
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute(
                        """INSERT INTO trailer_comments (user_name, comment_text, emoji_reaction) 
                           VALUES (%s, %s, %s) RETURNING id, user_name, comment_text, emoji_reaction, created_at::text as created_at""",
                        (user_name, comment_text, emoji_reaction)
                    )
                    conn.commit()
                    new_comment = cur.fetchone()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'comment': new_comment}),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        conn.close()
