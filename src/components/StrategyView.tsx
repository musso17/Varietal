import React from 'react';
import { Target, Users, Zap, BookOpen } from 'lucide-react';

export const StrategyView: React.FC = () => {
  return (
    <div className="strategy-container">
      {/* Top Section: Vision & Objectives */}
      <div className="strategy-grid">
        <div className="strategy-card main-vision">
          <div className="card-tag">Estrategia Varietal 2026</div>
          <h2 className="strategy-h2">Objetivos de Marca</h2>
          <div className="objectives-list">
            <div className="obj-item">
              <div className="obj-icon"><Target size={18} /></div>
              <div>
                <div className="obj-title">Posicionamiento como Barra</div>
                <div className="obj-desc">Consolidar a Varietal como la barra de café referente en Barranco, no solo como tostaduría.</div>
              </div>
            </div>
            <div className="obj-item">
              <div className="obj-icon"><Zap size={18} /></div>
              <div>
                <div className="obj-title">Educación al Consumidor</div>
                <div className="obj-desc">Traducir la complejidad técnica del tueste a un lenguaje visual atractivo y digerible.</div>
              </div>
            </div>
            <div className="obj-item">
              <div className="obj-icon"><Users size={18} /></div>
              <div>
                <div className="obj-title">El Point de Barranco</div>
                <div className="obj-desc">Construir comunidad para que los vecinos identifiquen a Varietal como su punto de encuentro diario.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="strategy-card">
          <h2 className="strategy-h2">Pilares de Contenido</h2>
          <div className="pilars-grid">
            <div className="pilar-item tostaduria">
              <div className="pilar-name">Pureza & Técnica</div>
              <div className="pilar-desc">El varietal es el héroe. Autoridad técnica, ratios, micras y perfiles de tueste sin simplificar el lenguaje.</div>
              <div className="pilar-tags">#Genética #Precisión #Autoridad</div>
            </div>
            <div className="pilar-item barra">
              <div className="pilar-name">Minimalismo Editorial</div>
              <div className="pilar-desc">Estética clínica pero sofisticada. Mostrar cómo la marca encaja en la luz y la arquitectura de Barranco.</div>
              <div className="pilar-tags">#Diseño #Barranco #ExpertoSilencioso</div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Carta Varietal */}
      <div className="strategy-card full-width">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <BookOpen className="text-accent" />
          <h2 className="strategy-h2" style={{ marginBottom: 0 }}>Menú / Carta Oficial</h2>
        </div>
        <p className="strategy-p">La oferta de productos disponible en la barra, base para la creación de contenido del Mes 2.</p>
        <div className="carta-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="carta-col">
            <div className="carta-label">Clásicos</div>
            <ul className="carta-list">
              <li>Espresso <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/8.50</span></li>
              <li>Americano <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/9.00</span></li>
              <li>Bebida con Leche <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/10.00</span></li>
              <li>Moka <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/12.00</span></li>
            </ul>
          </div>
          <div className="carta-col">
            <div className="carta-label">Fríos & Cold Brew</div>
            <ul className="carta-list">
              <li>Cold Brew <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/13.00</span></li>
              <li>Cold Brew Tonic <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/14.50</span></li>
              <li>Cold Brew Frutas <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/14.50</span></li>
              <li>Iced Latte <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/13.00</span></li>
              <li>Iced Moka <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/13.00</span></li>
            </ul>
          </div>
          <div className="carta-col">
            <div className="carta-label">Matcha</div>
            <ul className="carta-list">
              <li>Matcha Latte <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/14.00</span></li>
              <li>Iced Matcha Latte <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/15.90</span></li>
            </ul>
            
            <div className="carta-label" style={{ marginTop: '24px' }}>Combos</div>
            <ul className="carta-list">
              <li>Café Cal. + Croissant <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/15.00</span></li>
              <li>Café Caliente + Canelé <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/13.50</span></li>
            </ul>
          </div>
          <div className="carta-col">
            <div className="carta-label">Pastelería</div>
            <ul className="carta-list">
              <li>Galleta Chocochips <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/9.00</span></li>
              <li>Galleta Manzana <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/9.00</span></li>
              <li>Canelé <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/6.50</span></li>
              <li>Croissants <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/8.00</span></li>
              <li>Croissants Pollo <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/13.00</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section: 3-Month Roadmap */}
      <h2 className="strategy-h2" style={{ marginTop: '40px', paddingLeft: '8px' }}>Roadmap Estratégico (Q2 2026)</h2>
      <div className="roadmap-grid">
        <div className="roadmap-step active">
          <div className="step-num">01</div>
          <div className="step-content">
            <div className="step-month">Mes 1: Intriga & Lanzamiento</div>
            <div className="step-desc">Generar expectativa sobre la apertura. Mostrar cómo la estética clínica de Varietal se apropia del espacio en Barranco.</div>
            <div className="step-badge">#Anticipación #Barranco</div>
          </div>
        </div>
        <div className="roadmap-step">
          <div className="step-num">02</div>
          <div className="step-content">
            <div className="step-month">Mes 2: Foco en Carta & Oferta</div>
            <div className="step-desc">Profundizar en los productos reales. Dar protagonismo a las opciones de la carta, combos y pastelería disponible.</div>
            <div className="step-badge">#Menú #Oferta</div>
          </div>
        </div>
        <div className="roadmap-step">
          <div className="step-num">03</div>
          <div className="step-content">
            <div className="step-month">Mes 3: El Point del Barrio</div>
            <div className="step-desc">Construir la comunidad local. Dejar de lado las "colabs" para enfocarnos en los vecinos y creativos de la zona que nos visitan.</div>
            <div className="step-badge">#Comunidad #Vecinos</div>
          </div>
        </div>
      </div>
    </div>
  );
};
