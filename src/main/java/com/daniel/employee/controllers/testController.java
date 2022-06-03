package com.daniel.employee.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class testController {

    @RequestMapping(value="/", method = RequestMethod.GET)
    public String front(){
        return "some";
    }
}
