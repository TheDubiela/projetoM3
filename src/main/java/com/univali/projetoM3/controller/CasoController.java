package com.univali.projetoM3.controller;

import com.univali.projetoM3.entity.Caso;
import com.univali.projetoM3.service.CasoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CasoController {
    @Autowired
    private CasoService service;

    @RequestMapping("/casos")
    public List<Caso> list() {
        return service.list();
    }

    @PostMapping("/casos")
    public void save(@RequestBody Caso p) {
        service.add(p);
    }

    @DeleteMapping("/casos/{idCaso}")
    public void delete(@PathVariable long idCaso) {
        service.deleteById(idCaso);
    }

    @RequestMapping("/casos/{idCaso}")
    public Caso findById(@PathVariable long idCaso) {
        return service.findById(idCaso).get();
    }

    @PutMapping("/casos/{idCaso}")
    public void update(@PathVariable long idCaso, @RequestBody Caso newCaso) {
        Optional<Caso> oldCaso = service.findById(idCaso);
        if (oldCaso.isPresent()) {
            Caso aCaso = oldCaso.get();
            aCaso.setNome(newCaso.getNome());
            aCaso.setCpf(newCaso.getCpf());
            aCaso.setEmail(newCaso.getEmail());
            aCaso.setCep(newCaso.getCep());
            aCaso.setNumeroDaCasa(newCaso.getNumeroDaCasa());
            aCaso.setComplemento(newCaso.getComplemento());
            aCaso.setValorDaDivida(newCaso.getValorDaDivida());
            aCaso.setObjetoDaDivida(newCaso.getObjetoDaDivida());
            aCaso.setSituacao(newCaso.getSituacao());
            aCaso.setNumeroNaJustica(newCaso.getNumeroNaJustica());
            aCaso.setUser(newCaso.getUser());
            service.add(aCaso);
        }
    }
}
