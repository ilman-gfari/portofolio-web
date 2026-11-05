# Kunci jawaban: cacat yang sengaja ditanam di webds_daily.csv (JANGAN dibaca sebelum menganalisis)

- C1_perangkat_baru_tidak_masuk_webds: 105 baris
- C2_data_basi_saat_sinkron_gagal_sumatera: 240 baris
- C3_energi_meter_B_x1000: 550 baris
- C4_energi_kosong_inverter_C: 48 baris
- C5_status_beda_firmware_v23_dominan: 81 baris
- C6_baris_ganda_setelah_retry: 45 baris
- C7_perangkat_dinonaktifkan_masih_tampil: 78 baris

Jinak (bukan cacat): pembulatan energi 1 desimal di Web DS; gateway_G tidak punya energi (kosong di dua sistem); WARN_RETRY di log sinkron tanpa dampak data.
Rilis: R1 2026-10-02, R2 2026-10-13 (regresi energi meter_B), R3 2026-10-23, R4 2026-10-29.
