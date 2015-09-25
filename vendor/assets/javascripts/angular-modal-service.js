/*angular-modal-service v0.6.6 - https://github.com/dwmkerr/angular-modal-service */
!function(){"use strict";var e=angular.module("angularModalService",[]);e.factory("ModalService",["$document","$compile","$controller","$http","$rootScope","$q","$templateCache",function(e,n,l,t,o,r,a){function c(){var e=this,c=function(e,n){var l=r.defer();if(e)l.resolve(e);else if(n){var o=a.get(n);void 0!==o?l.resolve(o):t({method:"GET",url:n,cache:!0}).then(function(e){a.put(n,e.data),l.resolve(e.data)},function(e){l.reject(e)})}else l.reject("No template or templateUrl has been specified.");return l.promise};e.showModal=function(e){var t=r.defer(),a=e.controller;return a?(e.controllerAs&&(a=a+" as "+e.controllerAs),c(e.template,e.templateUrl).then(function(c){var u=o.$new(),s=r.defer(),p={$scope:u,close:function(e,n){(void 0===n||null===n)&&(n=0),window.setTimeout(function(){s.resolve(e),u.$destroy(),m.remove(),p.close=null,t=null,s=null,$=null,p=null,m=null,u=null},n)}};if(e.inputs)for(var d in e.inputs)p[d]=e.inputs[d];var f=angular.element(c),v=n(f),m=v(u);p.$element=m;var h=l(a,p);e.appendElement?e.appendElement.append(m):i.append(m);var $={controller:h,scope:u,element:m,close:s.promise};t.resolve($)}).then(null,function(e){t.reject(e)}),t.promise):(t.reject("No controller has been specified."),t.promise)}}var i=e.find("body");return new c}])}();
//# sourceMappingURL=angular-modal-service.min.js.map
