from flask.cli import AppGroup
from .users import seed_users, undo_users
from .communities import seed_communities, undo_communities
from .members import seed_members, undo_members
from .posts import seed_posts, undo_posts
from .comment import seed_comments, undo_comments
from .replies import seed_replies, undo_replies
from .votes import seed_vote, undo_vote

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_replies()
        undo_comments()
        undo_vote()
        undo_posts()
        undo_members()
        undo_communities()
        undo_users()
    seed_users()
    seed_communities()
    seed_members()
    seed_posts()
    seed_vote()
    seed_comments()
    seed_replies()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_comments()
    undo_comments()
    undo_posts()
    undo_vote()
    undo_members()
    undo_communities()
    undo_users()
    # Add other undo functions here