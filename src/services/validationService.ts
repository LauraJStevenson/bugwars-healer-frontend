import axios from "axios";

import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

class validationService {

    // Validation method for email
    static validateEmail(email: any) {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (email.length < 5 || email.length > 50) {
            return 'Username must be between 5 and 50 characters.';
        }
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address.';
        }
        return '';
    }


    // Validation method for first name
    static validateFirstName(firstName: any) {
        if (firstName.length < 2 || firstName.length > 15) {
            return 'First name must be between 2 and 15 characters.';
        }
        return '';
    }


    // Validation method for last name
    static validateLastName(lastName: any) {
        if (lastName.length < 2 || lastName.length > 15) {
            return 'Last name must be between 2 and 15 characters.';
        }
        return '';
    }

}

export default validationService;
