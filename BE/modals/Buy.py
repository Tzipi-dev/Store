from mongoengine import Document, DateTimeField, ReferenceField, ListField, ObjectIdField

class Buy(Document):
    dateOfBuy = DateTimeField()
    owner = ReferenceField('User')  # הפניה למודל User
    products = ListField(ReferenceField('Product'))  # רשימת הפניות למודל Product
    dateOfComming = DateTimeField()