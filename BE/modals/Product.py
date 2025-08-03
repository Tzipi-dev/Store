from mongoengine import (
    Document, StringField, FloatField, IntField, ListField,
    ReferenceField, DateTimeField
)

class Product(Document):
    name = StringField()
    price = FloatField()
    rating = FloatField()
    amountOfBuys = IntField()
    description = StringField()
    comments = ListField(StringField())
    category = StringField(choices=['עגילים', 'צמידים', 'שעונים', 'שרשראות', 'טבעות'])
    color = StringField(choices=['כסף', 'זהב'])
    sales = ListField(ReferenceField('Sale'))
    imageUrl = StringField()
    dateOfStart = DateTimeField()
    views = IntField()