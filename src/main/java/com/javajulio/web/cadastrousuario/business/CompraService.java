package com.javajulio.web.cadastrousuario.business;

import com.javajulio.web.cadastrousuario.infrastructure.entitys.Compra;
import com.javajulio.web.cadastrousuario.infrastructure.entitys.Padaria;
import com.javajulio.web.cadastrousuario.infrastructure.entitys.Usuario;
import com.javajulio.web.cadastrousuario.infrastructure.repository.CompraRepository;
import com.javajulio.web.cadastrousuario.infrastructure.repository.PadariaRepository;
import com.javajulio.web.cadastrousuario.infrastructure.repository.UsuarioRepository;
import dto.CompraRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompraService {
    private final CompraRepository compraRepository;
    private final UsuarioRepository usuarioRepository;
    private final PadariaRepository padariaRepository;

    public Compra criarCompraComDTO(CompraRequestDTO dto) {
        Usuario usuario = usuarioRepository.findById(Long.valueOf(dto.getUsuarioId()))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Compra compra = null;
        List<Padaria> produtos = compra.getProdutos().stream()
                .map(p -> padariaRepository.findById(p.getId())
                        .orElseThrow(() -> new RuntimeException("Produto não encontrado")))
                .collect(Collectors.toList());

        compra.setUsuario(usuario);
        compra.setProdutos(produtos);
        compra.setDataCompra(LocalDateTime.now());

        return compraRepository.save(compra);
    }


    private Double calcularValorTotal(List<Padaria> produtos) {
        return produtos.stream()
                .mapToDouble(Padaria::getPreco) // Certifique-se de que `getPreco()` existe na classe Padaria
                .sum();
    }
}

