package com.univali.projetoM3.dao;

import com.univali.projetoM3.entity.Caso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CasoDAO extends JpaRepository<Caso,Long> {
}
