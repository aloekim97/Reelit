from .db import db, environment, SCHEMA, add_prefix_for_prod

class Reply(db.Model):
    __tablename__ = 'replies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')), nullable=False)
    reply = db.Column(db.String(2000))
    created_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship("User", back_populates="reply")
    comment = db.relationship("Comment", back_populates="reply")


    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'comment_id': self.comment_id,
            'reply': self.reply,
            'created_at': self.created_at
        }