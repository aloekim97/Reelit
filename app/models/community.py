from .db import db, environment, SCHEMA, add_prefix_for_prod


class Community(db.Model):
    __tablename__ = 'communities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False, unique=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    community_img = db.Column(db.String(2000), nullable=False)
    background_img = db.Column(db.String(2000), nullable=False)

    community = db.relationship("User", back_populates="owner")
    posts = db.relationship("Post", back_populates="community", cascade="all, delete")
    

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'community_img': self.community_img,
            'members': self.members,
            'post': [post.to_dict() for post in self.posts]
        }