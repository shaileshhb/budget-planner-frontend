"use strict";(self.webpackChunkbudget_planner_frontend=self.webpackChunkbudget_planner_frontend||[]).push([[143],{7143:(w,d,r)=>{r.r(d),r.d(d,{LoginComponent:()=>F});var c=r(5861),l=r(6895),_=r(529),i=r(433),g=r(5466),e=r(8256),m=r(2370),u=r(646),p=r(9597);const v=["messageTemplate"];function f(t,a){1&t&&(e.TgZ(0,"div",20),e._uU(1," Username must be specified "),e.qZA())}function h(t,a){if(1&t&&(e.TgZ(0,"div"),e.YNc(1,f,2,0,"div",19),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.Q6J("ngIf",n.loginForm.get("username").errors.required)}}function T(t,a){1&t&&(e.TgZ(0,"div",20),e._uU(1," Password must be specified "),e.qZA())}function C(t,a){if(1&t&&(e.TgZ(0,"div"),e.YNc(1,T,2,0,"div",19),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.Q6J("ngIf",n.loginForm.get("password").errors.required)}}function Z(t,a){if(1&t&&(e.TgZ(0,"span",21)(1,"strong"),e._uU(2),e.qZA()()),2&t){const n=e.oxw();e.xp6(2),e.Oqu(n.message)}}let F=(()=>{class t{constructor(n,o,s,E){this.credService=n,this.localService=o,this.router=s,this.toastService=E,this.message="",this.loginForm=new i.cw({username:new i.NI(null,[i.kI.required]),password:new i.NI(null,[i.kI.required])}),this.credential=null}ngOnInit(){}validateForm(){console.log(this.loginForm.controls),this.loginForm.invalid?this.loginForm.markAllAsTouched():this.login()}login(){var n=this;return(0,c.Z)(function*(){n.credService.login(n.loginForm.value).subscribe({next:o=>{console.log(o.body),n.credential=o.body,n.localService.setJsonValue("userId",n.credential?.id),n.localService.setJsonValue("name",n.credential?.name),n.localService.setJsonValue("token",n.credential?.token),n.localService.setJsonValue("isVerified",n.credential?.isVerified),n.router.navigate(["account"])},error:o=>{console.error(o),n.message=o?.error?.error,n.toastService.show(n.messageTemplate,{classname:"bg-danger text-light",delay:5e3})}})})()}navigateToRegister(){console.log("navigateToRegister"),this.router.navigate(["register"])}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(g.T),e.Y36(m.C),e.Y36(u.F0),e.Y36(p.k))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-login"]],viewQuery:function(n,o){if(1&n&&e.Gf(v,5),2&n){let s;e.iGM(s=e.CRH())&&(o.messageTemplate=s.first)}},standalone:!0,features:[e._Bn([g.T]),e.jDz],decls:34,vars:5,consts:[[1,"container","my-10"],[1,"d-flex","justify-content-center"],[1,"card","card-width","rounded","shadow"],[1,"card-body"],[1,"card-title","text-justify"],[1,"card-subtitle"],[1,"pt-3"],[1,"d-flex","flex-column"],[3,"formGroup"],[1,"form-floating","mb-3"],["formControlName","username","type","text","id","usernameFloatingInput","placeholder","Enter username","maxlength","255",1,"form-control",3,"ngClass"],["for","usernameFloatingInput"],[4,"ngIf"],["formControlName","password","type","password","id","passwordFloatingInput","placeholder","Password","maxlength","255",1,"form-control",3,"ngClass"],["for","passwordFloatingInput"],[1,"mb-3"],["type","submit",1,"btn-blue","w-100","py-2","rounded",3,"click"],[1,"anchor-tag","cursor-pointer",3,"click"],["messageTemplate",""],["class","invalid-control",4,"ngIf"],[1,"invalid-control"],[1,"toast-font"]],template:function(n,o){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3")(6,"strong"),e._uU(7,"Login"),e.qZA()(),e.TgZ(8,"p",5),e._uU(9,"Hey, Enter your details to get sign in to your account"),e.qZA()(),e.TgZ(10,"div",6)(11,"div",7)(12,"form",8)(13,"div",9),e._UZ(14,"input",10),e.TgZ(15,"label",11),e._uU(16,"Username"),e.qZA(),e.YNc(17,h,2,1,"div",12),e.qZA(),e.TgZ(18,"div",9),e._UZ(19,"input",13),e.TgZ(20,"label",14),e._uU(21,"Password"),e.qZA(),e.YNc(22,C,2,1,"div",12),e.qZA(),e.TgZ(23,"div",15)(24,"button",16),e.NdJ("click",function(){return o.validateForm()}),e.TgZ(25,"strong"),e._uU(26,"Login in"),e.qZA()()()(),e.TgZ(27,"div",6)(28,"label"),e._uU(29,"Don't have an account?"),e.qZA(),e.TgZ(30,"a",17),e.NdJ("click",function(){return o.navigateToRegister()}),e._uU(31," Register Now"),e.qZA()()()()()()()(),e.YNc(32,Z,3,1,"ng-template",null,18,e.W1O)),2&n&&(e.xp6(12),e.Q6J("formGroup",o.loginForm),e.xp6(2),e.Q6J("ngClass",(o.loginForm.get("username").touched||o.loginForm.get("username").dirty)&&o.loginForm.get("username").invalid?"is-invalid":""),e.xp6(3),e.Q6J("ngIf",(o.loginForm.get("username").touched||o.loginForm.get("username").dirty)&&o.loginForm.get("username").invalid),e.xp6(2),e.Q6J("ngClass",(o.loginForm.get("password").touched||o.loginForm.get("password").dirty)&&o.loginForm.get("password").invalid?"is-invalid":""),e.xp6(3),e.Q6J("ngIf",(o.loginForm.get("username").touched||o.loginForm.get("username").dirty)&&o.loginForm.get("username").invalid))},dependencies:[l.ez,l.mk,l.O5,i.UX,i._Y,i.Fj,i.JJ,i.JL,i.nD,i.sg,i.u,_.JF],styles:[".card-width[_ngcontent-%COMP%]{width:50%}.anchor-tag[_ngcontent-%COMP%]{text-decoration:none;color:var(--blue)}@media screen and (max-width: 1000px){.card-width[_ngcontent-%COMP%]{width:80%}}@media screen and (max-width: 700px){.card-width[_ngcontent-%COMP%]{width:100%}}"]}),t})()}}]);