// -------------------------------------------------------------------------
// DailyCred REST Api Encapsulation Object
// -------------------------------------------------------------------------
var DailyCred = function(sClientId){
	// if not provided use the demo client_id
	this.sClientId      = sClientId;
	this.sUrlSignUp     = "https://www.dailycred.com/user/api/signup.json";
	this.sUrlSignIn     = "https://www.dailycred.com/user/api/signin.json";
	this.sUrlForgotPass = "https://www.dailycred.com/password/api/reset";
};

DailyCred.prototype.fApiCall = function(sUrl,aPayload,fCallback){
	$.ajax(
		{
			url         : sUrl,
			data        : aPayload,
			dataType    : "json",
			type        : "POST",
			success     : function(a) {
				if (a instanceof Object && a["worked"]){
					fCallback(null,a);
				}
				else{
					fCallback(a);
				}
			},
			error       : function(err) {
				fCallback(err);
			}
		}
	);
};

DailyCred.prototype.fLogIn = function(sEmail, sPassword, fCallback){
	this.fApiCall(
		this.sUrlSignIn,
		{
			"client_id" : this.sClientId,
			"email"     : sEmail,
			"pass"      : sPassword
		},
		fCallback
	);
};

DailyCred.prototype.fSignUp = function(sEmail, sPassword, fCallback){
	this.fApiCall(
		this.sUrlSignUp,
		{
			"client_id" : this.sClientId,
			"email"     : sEmail,
			"pass"      : sPassword
		},
		fCallback
	);
};

DailyCred.prototype.fRecoverLostPassword = function(sEmail, fCallback){
	this.fApiCall(
		this.sUrlForgotPass,
		{
			"client_id" : this.sClientId,
			"user"      : sEmail // DailyCred strangeness. We send email as user
		},
		fCallback
	);
};

