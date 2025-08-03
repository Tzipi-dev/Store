from mongoengine import Document, FloatField, ListField, ReferenceField

class Sale(Document):
    precent = FloatField()
    ParticipatingProducts = ListField(ReferenceField('Product'))