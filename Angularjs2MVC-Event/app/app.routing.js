"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./components/home.component");
var event_component_1 = require("./components/event.component");
var appRoutes = [
    { path: '', redirectTo: 'event', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'event', component: event_component_1.EventComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map