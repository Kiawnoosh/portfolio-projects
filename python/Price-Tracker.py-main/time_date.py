from datetime import datetime
import pytz
import jdatetime


def get_time_date():
    iran_tz = pytz.timezone("Asia/Tehran")
    iran_now = datetime.now(iran_tz)
    shamsi_now = jdatetime.datetime.fromgregorian(datetime=iran_now)
    result = shamsi_now.strftime("%Y/%m/%d") + " - " + iran_now.strftime("%H:%M:%S")
    return result
