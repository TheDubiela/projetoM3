package com.univali.projetoM3.service;

import com.univali.projetoM3.dao.CasoDAO;
import com.univali.projetoM3.entity.Caso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CasoServiceImpl implements CasoService {
    @Autowired
    private CasoDAO dao;

    @Override
    public void add(Caso c) {
        dao.save(c);
    }

    @Override
    public List<Caso> list() {
        return dao.findAll();
    }

    @Override
    public void delete(Caso c) {
        dao.delete(c);
    }

    @Override
    public Optional<Caso> findById(Long caseId) {
        return dao.findById(caseId);
    }

    @Override
    public void deleteById(long caseId) {
        dao.deleteById(caseId);
    }
}
