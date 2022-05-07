from sqlalchemy import Integer, String, Column, Boolean
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Manufacturer(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)