package com.univali.projetoM3.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Caso {
    @Id
    @GeneratedValue
    private long idCaso;

    private String nome;

    private String cpf;

    private String email;

    private String cep;

    private String numeroDaCasa;

    private String complemento;

    private String valorDaDivida;

    private String objetoDaDivida;

    private String situacao;

    private String numeroNaJustica;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "idUser", nullable = false)
    private User user;
}
