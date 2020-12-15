package com.univali.projetoM3.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RoutersController {

    @GetMapping("/caso/index")
    public String casoIndex(){
        return "/caso/index";
    }

}
