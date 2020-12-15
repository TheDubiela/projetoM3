package com.univali.projetoM3.service;

import com.univali.projetoM3.entity.Caso;

import java.util.List;
import java.util.Optional;

public interface CasoService {
    void add(Caso c);

    List<Caso> list();

    void delete(Caso c);

    Optional<Caso> findById(Long caseId);

    void deleteById(long caseId);
}
