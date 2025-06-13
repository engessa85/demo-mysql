import logging
from logging.handlers import RotatingFileHandler
import sys
import re
def remove_emojis(text):
    return re.sub(r'[^\w\s,.!?]', '', text)

import logging
import sys
import re
from logging.handlers import RotatingFileHandler


def remove_non_utf8(text: str) -> str:
    """Remove non-UTF-8 characters (e.g., emojis) to prevent encoding issues."""
    return re.sub(r'[^\x00-\x7F]+', '', text)


class UnicodeSafeLogger(logging.Logger):
    """Custom Logger that automatically removes non-UTF-8 characters on error."""

    def make_safe_log(self, level, msg, *args, **kwargs):
        """Log messages safely by handling UnicodeEncodeError."""
        try:
            super().log(level, msg, *args, **kwargs)
        except UnicodeEncodeError:
            safe_msg = remove_non_utf8(msg)
            super().log(level, safe_msg, *args, **kwargs)


def setup_logger(
        name: str = "app",
        log_file: str = "app.log",
        log_level: int = logging.DEBUG,
        max_bytes: int = 10 * 1024 * 1024,  # 10 MB per log file
        backup_count: int = 5
) -> logging.Logger:
    """
    Sets up a rotating logger with console and file handlers.

    :param name: Logger name
    :param log_file: Log file name
    :param log_level: Logging level (e.g., logging.DEBUG, logging.INFO)
    :param max_bytes: Max size per log file before rotation
    :param backup_count: Number of backup logs to keep
    :return: Configured logger instance
    """
    logging.setLoggerClass(UnicodeSafeLogger)  # Use the custom logger
    logger = logging.getLogger(name)

    if logger.hasHandlers():
        return logger  # Prevent duplicate handlers

    logger.setLevel(log_level)
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(name)s - %(message)s")

    # Console Handler (UTF-8 safe)
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(log_level)
    console_handler.setFormatter(formatter)

    try:
        console_handler.stream.reconfigure(encoding="utf-8")  # Ensure UTF-8 encoding (Python 3.7+)
    except AttributeError:
        pass  # Older Python versions ignore this

    logger.addHandler(console_handler)

    # File Handler with Rotation (UTF-8 safe)
    file_handler = RotatingFileHandler(log_file, maxBytes=max_bytes, backupCount=backup_count, encoding="utf-8")
    file_handler.setLevel(log_level)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    return logger


# Initialize the logger
logger = setup_logger(name="my_app", log_file="chat_logs.log")