from sqlalchemy import Integer, String, Column

from app.db.base_class import Base


class Address(Base):
    id = Column(Integer, primary_key=True, index=True)
    street_address_1 = Column(String, nullable=False)
    street_address_1 = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state_id = Column(String, nullable=False)
    country = Column(String, nullable=False)
    zipcode = Column(String, nullable=False)