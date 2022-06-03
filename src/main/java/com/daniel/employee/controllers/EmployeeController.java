package com.daniel.employee.controllers;

import com.daniel.employee.model.Employee;
import com.daniel.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @PostMapping(value="/employees")
    public Employee createEmployee(@RequestBody Employee emp){
        return employeeService.createEmployee(emp);
    }

    @GetMapping(value="/employees")
    public List<Employee> readEmployees(){
        return employeeService.getEmployees();
    }

    @RequestMapping(value="/employees/{empId}", method=RequestMethod.PUT)
    public Employee updateEmployee(@PathVariable(value="empId") long id, @RequestBody Employee employeeDedails){
        return employeeService.updateEmployee(id, employeeDedails);
    }

    @RequestMapping(value="/employees/{empId}", method=RequestMethod.DELETE)
    public void deleteEmployee(@PathVariable(value = "empId") long id){
        employeeService.deleteEmployee(id);
    }


}
