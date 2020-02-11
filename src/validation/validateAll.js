import validator from "validator";
import { isEmpty } from "./isEmpty";

const validators = {
  validateRegisterPassA: function(data) {
    let errors = {};
    data.fname = !isEmpty(data.fname) ? data.fname : "";
    data.lname = !isEmpty(data.lname) ? data.lname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.mobno = !isEmpty(data.mobno) ? data.mobno : "";
    if (!validator.isLength(data.fname, { min: 2, max: 30 })) {
      errors.fname = "First name must be between 2 and 30 characters.";
    }
    if (!validator.isLength(data.lname, { min: 2, max: 30 })) {
      errors.lname = "Lname name must be between 2 and 30 characters.";
    }
    if (validator.isEmpty(data.fname)) {
      errors.fname = "First name is required.";
    }
    if (validator.isEmpty(data.lname)) {
      errors.lname = "Last name is required.";
    }
    if (!validator.isMobilePhone(data.mobno)) {
      errors.mobno = "Invalid Phone Number";
    }
    const validLocales = [
      "en-AU",
      "en-CA",
      "en-GB",
      "en-HK",
      "en-IN",
      "en-KE",
      "en-NG",
      "en-NZ",
      "en-RW",
      "en-SG",
      "en-UG",
      "en-US",
      "en-TZ",
      "en-ZA",
      "en-ZM",
      "en-PK",
      "es-ES",
      "es-MX",
      "es-UY"
    ];
    if (!validator.isMobilePhone(data.mobno, validLocales)) {
      errors.mobno = "Invalid Phone Number";
    }
    if (validator.isEmpty(data.mobno)) {
      errors.mobno = "Phone Number is required";
    }
    if (validator.isEmpty(data.email)) {
      errors.email = "Email field is required.";
    }
    if (!validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  },
  validateRegisterPassB: function(data) {
    let errors = {};
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.vcode = !isEmpty(data.vcode) ? data.vcode : "";
    if (validator.isEmpty(data.vcode)) {
      errors.vcode = "Verification code is required";
    }
    if (validator.isEmpty(data.password)) {
      errors.password = "Password field is required.";
    }
    if (validator.isEmpty(data.password2)) {
      errors.password2 = "Confirm password field is required.";
    }
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must be atleast 6 characters.";
    }
    if (!validator.equals(data.password, data.password2)) {
      errors.password2 = "Password must match";
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  },
  validateUserLoginA: function(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    if (validator.isEmpty(data.email)) {
      errors.lemail = "Email field is required.";
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  },
  validateUserLoginB: function(data) {
    let errors = {};
    data.password = !isEmpty(data.password) ? data.password : "";
    if (validator.isEmpty(data.password)) {
      errors.lpassword = "Password field is required.";
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  },
  validateUserPosts: function(data) {
    let errors = {};

    data.timeline_id = !isEmpty(data.timeline_id) ? data.timeline_id : "";
    data.text = !isEmpty(data.text) ? data.text : "";
    if (validator.isEmpty(data.timeline_id)) {
      errors.timeline_id = "Unable to get Timeline";
    }
    if (validator.isEmpty(data.text)) {
      errors.text = "You haven't entered any content";
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  },
  validateUserLike: function(data) {
    let errors = {};

    data.liker_id = !isEmpty(data.liker_id) ? data.liker_id : "";
    data.like_type = !isEmpty(data.like_type) ? data.like_type : "";
    if (validator.isEmpty(data.liker_id)) {
      errors.liker_id = "Unable to get Liker Id";
    }
    if (validator.isEmpty(data.like_type)) {
      errors.like_type = "Unable to get like";
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  },
  validateUserComment: function(data) {
    let errors = {};
    data.comment_txt = !isEmpty(data.comment_txt) ? data.comment_txt : "";
    if (validator.isEmpty(data.comment_txt)) {
      errors.comment_txt = "Please enter the text";
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
};

export default validators;
