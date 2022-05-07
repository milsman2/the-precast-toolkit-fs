from sqlalchemy import Integer, String, Column, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class RoundPipe(Base):
    id = Column(Integer, primary_key=True, index=True)
    material = Column(String(32), nullable=False)
    inner_diameter = Column(Float(precision=2), nullable=False)
    outer_diameter = Column(Float(precision=2), nullable=False)
    submitter_id = Column(Integer, ForeignKey("user.id"), nullable=True)

    submitter = relationship("User", back_populates="round_pipes", lazy='selectin')