from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Cast_Iron(Base):
    id = Column(Integer, primary_key=True, index=True)
    label = Column(String(256), nullable=False)
    Vulcan_style_code = Column(String(64), nullable=False, unique=True)
    EJ_code = Column(String(64))
    SIP_code = Column(String(64))
    Accucast_code = Column(String(64))
    description = Column(String(64))
    avg_weight = Column(Integer)
    submitter_id = Column(Integer, ForeignKey("user.id"), nullable=True)

    submitter = relationship("User", back_populates="cast_irons", lazy='selectin')