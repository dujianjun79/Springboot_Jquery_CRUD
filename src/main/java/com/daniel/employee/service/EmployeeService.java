package com.daniel.employee.service;

import com.daniel.employee.model.Employee;
import com.daniel.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    EmployeeRepository emRepository;

    public Employee createEmployee(Employee emp) {
        return emRepository.save(emp);
    }

    public List<Employee> getEmployees(){
        return emRepository.findAll();
    }

    public  void  deleteEmployee(Long empId){
        emRepository.deleteById(empId);
    }

    public Employee updateEmployee(Long empId, Employee employeeDetails){
        Employee emp = emRepository.findById(empId).get();
        emp.setFirstName(employeeDetails.getFirstName());
        emp.setLastName(employeeDetails.getLastName());
        emp.setEmail(employeeDetails.getEmail());
        return emRepository.save(emp);
    }

}
