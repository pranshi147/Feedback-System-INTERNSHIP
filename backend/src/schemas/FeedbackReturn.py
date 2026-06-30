from sqlalchemy import String, ARRAY, Integer
from sqlalchemy.orm import Mapped, mapped_column

class FeedbackReturn:
    uuid: Mapped[int] = mapped_column(primary_key=True)
    questions: Mapped[list[int]] = mapped_column(ARRAY(Integer))
    commentBox: Mapped[str] = mapped_column(String(1023))
