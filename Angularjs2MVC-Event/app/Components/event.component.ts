import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../Service/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IEvent } from '../Models/event';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({
	templateUrl: './app/components/event.component.html'
})

export class EventComponent implements OnInit {

	@ViewChild('modal') modal: ModalComponent;
	events: IEvent[];
	event: IEvent;
	msg: string;
	indLoading: boolean = false;
	eventFrm: FormGroup;
	dbops: DBOperation;
	modalTitle: string;
	modalBtnTitle: string;

	constructor(private fb: FormBuilder, private _eventService: EventService) { }

	ngOnInit(): void {
		this.eventFrm = this.fb.group({
			Id: [''],
			EventName: ['', Validators.required],
			Description: [''],
			EventDate: ['', Validators.required],
			Venue: ['', Validators.required]
		});
		this.LoadEvents();
	}

	LoadEvents(): void {
		this.indLoading = true;
		this._eventService.get(Global.BASE_USER_ENDPOINT)
			.subscribe(events => { this.events = events; this.indLoading = false; },
			error => this.msg = <any>error);
	}

	addEvent() {
		this.dbops = DBOperation.create;
		this.SetControlsState(true);
		this.modalTitle = "Add New Event";
		this.modalBtnTitle = "Add";
		this.eventFrm.reset();
		this.modal.open();
	}

	editEvent(id: number) {
		this.dbops = DBOperation.update;
		this.SetControlsState(true);
		this.modalTitle = "Edit event";
		this.modalBtnTitle = "Update";
		this.event = this.events.filter(x => x.Id == id)[0];
		this.eventFrm.setValue(this.event);
		this.modal.open();
	}

	deleteEvent(id: number) {
		this.dbops = DBOperation.delete;
		this.SetControlsState(false);
		this.modalTitle = "Confirm to Delete?";
		this.modalBtnTitle = "Delete";
		this.event = this.events.filter(x => x.Id == id)[0];
		this.eventFrm.setValue(this.event);
		this.modal.open();
	}

	onSubmit(formData: any) {
		this.msg = "";

		switch (this.dbops) {
			case DBOperation.create:
				this._eventService.post(Global.BASE_USER_ENDPOINT, formData._value).subscribe(
					data => {
						if (data == 1) //Success
						{
							this.msg = "Data successfully added.";
							this.LoadEvents();
						}
						else {
							this.msg = "There is some issue in saving records, please contact to system administrator!"
						}

						this.modal.dismiss();
					},
					error => {
						this.msg = error;
					}
				);
				break;
			case DBOperation.update:
				this._eventService.put(Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(
					data => {
						if (data == 1) //Success
						{
							this.msg = "Data successfully updated.";
							this.LoadEvents();
						}
						else {
							this.msg = "There is some issue in saving records, please contact to system administrator!"
						}

						this.modal.dismiss();
					},
					error => {
						this.msg = error;
					}
				);
				break;
			case DBOperation.delete:
				this._eventService.delete(Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(
					data => {
						if (data == 1) //Success
						{
							this.msg = "Data successfully deleted.";
							this.LoadEvents();
						}
						else {
							this.msg = "There is some issue in saving records, please contact to system administrator!"
						}

						this.modal.dismiss();
					},
					error => {
						this.msg = error;
					}
				);
				break;

		}
	}

	SetControlsState(isEnable: boolean) {
		isEnable ? this.eventFrm.enable() : this.eventFrm.disable();
	}
}