from sqlalchemy import Integer, String, Column, Boolean
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(256), nullable=True)
    last_name = Column(String(256), nullable=True)
    email = Column(String, index=True, nullable=False)
    is_superuser = Column(Boolean, default=False)
    hashed_password = Column(String, nullable=False)
    
    cast_irons = relationship("Cast_Iron", back_populates="submitter",  lazy = 'selectin')
    round_pipes = relationship("RoundPipe", back_populates="submitter",  lazy = 'selectin')