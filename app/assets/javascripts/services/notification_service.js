app.factory('NotificationService', function () {

  var NotificationService = {};

  var _noticeData = {
    notices: {
      success: [],
      failure: [],
      timeout: []
    }
  };

  NotificationService.addSuccess = function (data) {
    _noticeData.notices.success.push(data);
  };

  NotificationService.addFailure = function (data) {
    _noticeData.notices.failure.push(data);
  };

  NotificationService.addTimeout = function (data) {
    _noticeData.notices.timeout.push(data);
  };

  NotificationService.getNoticeData = function () {
    return _noticeData;
  };

  return NotificationService;
});
