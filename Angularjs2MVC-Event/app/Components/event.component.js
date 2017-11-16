"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var event_service_1 = require("../Service/event.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var EventComponent = /** @class */ (function () {
    function EventComponent(fb, _eventService) {
        this.fb = fb;
        this._eventService = _eventService;
        this.indLoading = false;
    }
    EventComponent.prototype.ngOnInit = function () {
        this.eventFrm = this.fb.group({
            Id: [''],
            EventName: ['', forms_1.Validators.required],
            Description: [''],
            EventDate: ['', forms_1.Validators.required],
            Venue: ['', forms_1.Validators.required]
        });
        this.LoadEvents();
    };
    EventComponent.prototype.LoadEvents = function () {
        var _this = this;
        this.indLoading = true;
        this._eventService.get(global_1.Global.BASE_USER_ENDPOINT)
            .subscribe(function (events) { _this.events = events; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    EventComponent.prototype.addEvent = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Event";
        this.modalBtnTitle = "Add";
        this.eventFrm.reset();
        this.modal.open();
    };
    EventComponent.prototype.editEvent = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit event";
        this.modalBtnTitle = "Update";
        this.event = this.events.filter(function (x) { return x.Id == id; })[0];
        this.eventFrm.setValue(this.event);
        this.modal.open();
    };
    EventComponent.prototype.deleteEvent = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.event = this.events.filter(function (x) { return x.Id == id; })[0];
        this.eventFrm.setValue(this.event);
        this.modal.open();
    };
    EventComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._eventService.post(global_1.Global.BASE_USER_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully added.";
                        _this.LoadEvents();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._eventService.put(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully updated.";
                        _this.LoadEvents();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._eventService.delete(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully deleted.";
                        _this.LoadEvents();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    EventComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.eventFrm.enable() : this.eventFrm.disable();
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], EventComponent.prototype, "modal", void 0);
    EventComponent = __decorate([
        core_1.Component({
            templateUrl: './app/components/event.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, event_service_1.EventService])
    ], EventComponent);
    return EventComponent;
}());
exports.EventComponent = EventComponent;
//# sourceMappingURL=event.component.js.map