from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post
from login_form import current_user

class PostForm(FlaskForm):
    user_id = IntegerField(db.String, validators=[DataRequired()]),
    content = StringField(db.String, validators=[DataRequired()])