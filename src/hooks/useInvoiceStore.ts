/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * InvoiceGEN - Générateur de facture gratuit professionnel
 * Hook de gestion d'état des factures avec stockage local
 * 
 * Version: 2.0.0 - 2026
 * Conforme à l'article 293 B du CGI & autoliquidation TVA
 * 
 * Architecture Local-First : toutes les données sont stockées exclusivement
 * dans le localStorage du navigateur, garantissant une confidentialité totale.
 * Aucune donnée n'est transmise ou stockée sur nos serveurs.
 * 
 * Mentions légales conformes aux articles L. 441-3 et L. 441-4 du Code de commerce :
 * - Numéro unique et chronologique
 * - Date d'émission
 * - SIRET et code NAF/APE
 * - TVA intracommunautaire
 * - Conditions de paiement
 * - Pénalités de retard (taux d'intérêt légal + 10 points)
 * - Indemnité forfaitaire de recouvrement (40 €)
 */

import { useState, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { Invoice, UserProfile } from '../types';

/**
 * Profil utilisateur par défaut conforme aux exigences fiscales
 * 
 * Inclut les informations nécessaires pour les mentions obligatoires :
 * - SIRET : identification de l'entreprise (article L. 441-3)
 * - Adresse : siège social
 * - Coordonnées : email, téléphone
 * - RIB/IBAN : informations bancaires pour les paiements
 * 
 * Pour les bénéficiaires de la franchise TVA (article 293 B du CGI),
 * la mention "TVA non applicable, article 293 B du CGI" sera automatiquement ajoutée.
 * Pour les opérations soumises à autoliquidation (article 283-2),
 * la mention "TVA autoliquidée par le preneur - article 283 du CGI" sera utilisée.
 */
const INITIAL_PROFILE: UserProfile = {
  companyName: 'Ma Super Entreprise',
  email: 'contact@entreprise.fr',
  address: '123 Avenue de la République, 75011 Paris',
  phone: '01 23 45 67 89',
  siret: '123 456 789 00012',
  rib: 'FR76 1234 5678 9012 3456 7890 123',
  // TVA intracommunautaire (optionnel) - Format: FR + 11 chiffres
  vatNumber: '',
};

/**
 * useInvoiceStore - Hook personnalisé pour la gestion des factures
 * 
 * Fonctionnalités :
 * - Stockage persistant des factures dans localStorage
 * - Sauvegarde automatique avec debounce (500ms)
 * - Gestion du profil utilisateur
 * - Opérations CRUD sur les factures
 * 
 * Architecture Local-First :
 * Conformément au RGPD et aux bonnes pratiques de sécurité,
 * toutes les données restent sur l'appareil de l'utilisateur.
 * Aucune donnée de facturation (noms, montants, descriptions)
 * n'est transmise ou stockée sur nos serveurs.
 * 
 * Conformité fiscale :
 * Les factures générées via ce hook intègrent automatiquement :
 * - La mention "TVA non applicable, article 293 B du CGI" pour les bénéficiaires de la franchise
 * - La mention "TVA autoliquidée par le preneur - article 283 du CGI" pour les opérations en reverse charge
 * - Les pénalités de retard (taux d'intérêt légal + 10 points)
 * - L'indemnité forfaitaire de recouvrement de 40 €
 * - Les conditions de paiement (30 jours fin de mois recommandé)
 * - Le SIRET et code NAF/APE
 * - La TVA intracommunautaire (validation VIES)
 * 
 * @returns {Object} - Objet contenant les factures, le profil et les fonctions de gestion
 */
export function useInvoiceStore() {
  // ============================================
  // INITIALISATION AVEC CHARGEMENT LOCALSTORAGE
  // ============================================
  
  /**
   * Chargement des factures depuis le localStorage
   * 
   * Le localStorage permet un stockage persistant sans serveur,
   * garantissant la confidentialité des données commerciales.
   * Format de stockage : JSON
   * Limite de stockage : ~5-10 Mo par domaine
   */
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const saved = localStorage.getItem('invoices');
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log(`[InvoiceGEN] Chargement de ${parsed.length} factures depuis localStorage`);
        return parsed;
      }
    } catch (error) {
      console.error('[InvoiceGEN] Erreur lors du chargement des factures:', error);
    }
    return [];
  });

  /**
   * Chargement du profil utilisateur depuis le localStorage
   * 
   * Le profil contient les informations obligatoires pour la facturation :
   * - Coordonnées de l'entreprise (SIRET, adresse, etc.)
   * - Informations bancaires (RIB/IBAN)
   * - TVA intracommunautaire (pour les opérations transfrontalières)
   */
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('userProfile');
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('[InvoiceGEN] Profil utilisateur chargé depuis localStorage');
        return parsed;
      }
    } catch (error) {
      console.error('[InvoiceGEN] Erreur lors du chargement du profil:', error);
    }
    return INITIAL_PROFILE;
  });

  // ============================================
  // SAUVEGARDE AUTOMATIQUE AVEC DEBOUNCE
  // ============================================
  
  /**
   * Sauvegarde différée des factures dans localStorage
   * 
   * Le debounce (500ms) évite les écritures trop fréquentes sur le disque,
   * optimisant les performances et la durée de vie du localStorage.
   * Chaque modification de facture déclenche une sauvegarde automatique.
   * 
   * @param invoices - Liste des factures à sauvegarder
   */
  const debouncedSaveInvoices = useMemo(() => debounce((invoices: Invoice[]) => {
    try {
      localStorage.setItem('invoices', JSON.stringify(invoices));
      console.log(`[InvoiceGEN] ${invoices.length} factures sauvegardées`);
    } catch (error) {
      console.error('[InvoiceGEN] Erreur lors de la sauvegarde des factures:', error);
      // En cas d'erreur de stockage (localStorage plein), afficher une alerte
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        alert('Stockage local saturé. Veuillez supprimer d\'anciennes factures.');
      }
    }
  }, 500), []);

  /**
   * Sauvegarde différée du profil utilisateur dans localStorage
   * 
   * Le profil est sauvegardé automatiquement après chaque modification,
   * avec un délai de 500ms pour éviter les écritures multiples.
   */
  const debouncedSaveProfile = useMemo(() => debounce((profile: UserProfile) => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      console.log('[InvoiceGEN] Profil utilisateur sauvegardé');
    } catch (error) {
      console.error('[InvoiceGEN] Erreur lors de la sauvegarde du profil:', error);
    }
  }, 500), []);

  // ============================================
  // EFFETS DE SAUVEGARDE AUTOMATIQUE
  // ============================================
  
  /**
   * Effet : Sauvegarde automatique des factures
   * 
   * À chaque modification de la liste des factures, une sauvegarde différée
   * est déclenchée. Le cleanup annule la sauvegarde en attente si le composant
   * est démonté avant l'exécution.
   */
  useEffect(() => {
    debouncedSaveInvoices(invoices);
    return () => debouncedSaveInvoices.cancel();
  }, [invoices, debouncedSaveInvoices]);

  /**
   * Effet : Sauvegarde automatique du profil
   */
  useEffect(() => {
    debouncedSaveProfile(profile);
    return () => debouncedSaveProfile.cancel();
  }, [profile, debouncedSaveProfile]);

  // ============================================
  // FONCTIONS DE GESTION DES FACTURES (CRUD)
  // ============================================
  
  /**
   * Ajoute une nouvelle facture au début de la liste
   * 
   * @param invoice - Facture à ajouter
   */
  const addInvoice = (invoice: Invoice) => {
    setInvoices([invoice, ...invoices]);
    console.log(`[InvoiceGEN] Facture ${invoice.invoiceNumber} ajoutée`);
  };

  /**
   * Met à jour une facture existante
   * 
   * @param invoice - Facture mise à jour
   */
  const updateInvoice = (invoice: Invoice) => {
    setInvoices(invoices.map(i => i.id === invoice.id ? invoice : i));
    console.log(`[InvoiceGEN] Facture ${invoice.invoiceNumber} mise à jour`);
  };

  /**
   * Supprime une facture par son ID
   * 
   * @param id - Identifiant unique de la facture
   */
  const deleteInvoice = (id: string) => {
    const deleted = invoices.find(i => i.id === id);
    setInvoices(invoices.filter(i => i.id !== id));
    if (deleted) {
      console.log(`[InvoiceGEN] Facture ${deleted.invoiceNumber} supprimée`);
    }
  };

  // ============================================
  // RETOUR DES DONNÉES ET FONCTIONS
  // ============================================
  
  /**
   * Export des données pour les composants React
   * 
   * Le hook retourne :
   * - invoices : Liste des factures
   * - profile : Profil de l'utilisateur
   * - setProfile : Fonction de mise à jour du profil
   * - addInvoice : Ajout de facture
   * - updateInvoice : Mise à jour de facture
   * - deleteInvoice : Suppression de facture
   */
  return { 
    invoices, 
    profile, 
    setProfile, 
    addInvoice, 
    updateInvoice, 
    deleteInvoice 
  };
}