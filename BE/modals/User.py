from mongoengine import Document, StringField, ListField, ReferenceField

class User(Document):
    name = StringField()
    email = StringField()
    password = StringField()
    phone = StringField()
    address = StringField()
    allBuys = ListField(ReferenceField('Buy'))
    FavoriteProducts = ListField(ReferenceField('Product'))