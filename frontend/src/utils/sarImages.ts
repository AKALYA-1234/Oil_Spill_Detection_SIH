export interface SarSegmentedImage {
  id: number;
  title: string;
  filename: string;
  originalFilename: string;
  path: string;
  originalPath: string;
  timestamp: string;
  coordinates: {
    lat: number;
    lon: number;
    formatted: string;
  };
  slickAreaKm2: number;
  confidence: number;
  sensor: string;
  polarization: string;
  orbitPass: string;
  status: 'Flagged Anomaly' | 'High Risk Slick' | 'Verified Spill' | 'Monitored Region';
}

export const SAR_SEGMENTED_IMAGES: SarSegmentedImage[] = [
  {
    id: 1,
    title: 'SAR Segmented Anomaly #01',
    filename: 'sar_segmented_1.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.22.34 PM.jpeg',
    path: '/sar-segmented/sar_segmented_1.jpeg',
    originalPath: '/sar-segmented/WhatsApp%20Image%202026-09-22%20at%203.22.34%20PM.jpeg',
    timestamp: '2026-09-22 15:22:34 UTC',
    coordinates: { lat: 13.182, lon: 80.314, formatted: '13°10\'55.2"N 80°18\'50.4"E' },
    slickAreaKm2: 12.8,
    confidence: 94,
    sensor: 'Sentinel-1A SAR',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41982',
    status: 'High Risk Slick'
  },
  {
    id: 2,
    title: 'SAR Segmented Anomaly #02',
    filename: 'sar_segmented_2.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.22.49 PM.jpeg',
    path: '/sar-segmented/sar_segmented_2.jpeg',
    originalPath: '/sar-segmented/WhatsApp%20Image%202026-09-22%20at%203.22.49%20PM.jpeg',
    timestamp: '2026-09-22 15:22:49 UTC',
    coordinates: { lat: 13.245, lon: 80.412, formatted: '13°14\'42.0"N 80°24\'43.2"E' },
    slickAreaKm2: 8.4,
    confidence: 91,
    sensor: 'Sentinel-1A SAR',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41982',
    status: 'Verified Spill'
  },
  {
    id: 3,
    title: 'SAR Segmented Anomaly #03',
    filename: 'sar_segmented_3.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.23.09 PM.jpeg',
    path: '/sar-segmented/sar_segmented_3.jpeg',
    originalPath: '/sar-segmented/WhatsApp%20Image%202026-09-22%20at%203.23.09%20PM.jpeg',
    timestamp: '2026-09-22 15:23:09 UTC',
    coordinates: { lat: 13.104, lon: 80.288, formatted: '13°06\'14.4"N 80°17\'16.8"E' },
    slickAreaKm2: 15.2,
    confidence: 96,
    sensor: 'Sentinel-1B SAR',
    polarization: 'VV + VH',
    orbitPass: 'DESCENDING #38411',
    status: 'Flagged Anomaly'
  },
  {
    id: 4,
    title: 'SAR Segmented Anomaly #04',
    filename: 'sar_segmented_4.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.23.34 PM.jpeg',
    path: '/sar-segmented/sar_segmented_4.jpeg',
    originalPath: '/sar-segmented/WhatsApp%20Image%202026-09-22%20at%203.23.34%20PM.jpeg',
    timestamp: '2026-09-22 15:23:34 UTC',
    coordinates: { lat: 13.310, lon: 80.520, formatted: '13°18\'36.0"N 80°31\'12.0"E' },
    slickAreaKm2: 19.6,
    confidence: 97,
    sensor: 'Sentinel-1A SAR',
    polarization: 'VV',
    orbitPass: 'ASCENDING #41983',
    status: 'Verified Spill'
  },
  {
    id: 5,
    title: 'SAR Segmented Anomaly #05',
    filename: 'sar_segmented_5.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.23.49 PM.jpeg',
    path: '/sar-segmented/sar_segmented_5.jpeg',
    originalPath: '/sar-segmented/WhatsApp%20Image%202026-09-22%20at%203.23.49%20PM.jpeg',
    timestamp: '2026-09-22 15:23:49 UTC',
    coordinates: { lat: 13.080, lon: 80.201, formatted: '13°04\'48.0"N 80°12\'03.6"E' },
    slickAreaKm2: 6.1,
    confidence: 89,
    sensor: 'Sentinel-1B SAR',
    polarization: 'VH',
    orbitPass: 'DESCENDING #38412',
    status: 'Monitored Region'
  },
  {
    id: 6,
    title: 'SAR Segmented Anomaly #06',
    filename: 'sar_segmented_6.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.28.39 PM.jpeg',
    path: '/sar-segmented/sar_segmented_6.jpeg',
    originalPath: '/sar-segmented/WhatsApp%20Image%202026-09-22%20at%203.28.39%20PM.jpeg',
    timestamp: '2026-09-22 15:28:39 UTC',
    coordinates: { lat: 13.199, lon: 80.340, formatted: '13°11\'56.4"N 80°20\'24.0"E' },
    slickAreaKm2: 11.3,
    confidence: 93,
    sensor: 'Sentinel-1A SAR',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41984',
    status: 'High Risk Slick'
  },
  {
    id: 7,
    title: 'SAR Segmented Anomaly #07',
    filename: 'sar_segmented_7.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.28.53 PM.jpeg',
    path: '/sar-segmented/sar_segmented_7.jpeg',
    originalPath: '/sar-segmented/WhatsApp%20Image%202026-09-22%20at%203.28.53%20PM.jpeg',
    timestamp: '2026-09-22 15:28:53 UTC',
    coordinates: { lat: 13.412, lon: 80.601, formatted: '13°24\'43.2"N 80°36\'03.6"E' },
    slickAreaKm2: 14.7,
    confidence: 95,
    sensor: 'Sentinel-1A SAR',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41984',
    status: 'Verified Spill'
  },
  {
    id: 8,
    title: 'SAR Segmented Anomaly #08',
    filename: 'sar_segmented_8.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.29.05 PM.jpeg',
    path: '/sar-segmented/sar_segmented_8.jpeg',
    originalPath: '/sar-segmented/WhatsApp%20Image%202026-09-22%20at%203.29.05%20PM.jpeg',
    timestamp: '2026-09-22 15:29:05 UTC',
    coordinates: { lat: 13.015, lon: 80.190, formatted: '13°00\'54.0"N 80°11\'24.0"E' },
    slickAreaKm2: 9.8,
    confidence: 92,
    sensor: 'Sentinel-1B SAR',
    polarization: 'VV',
    orbitPass: 'DESCENDING #38415',
    status: 'Flagged Anomaly'
  },
  {
    id: 9,
    title: 'SAR Segmented Anomaly #09',
    filename: 'sar_segmented_9.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.29.22 PM.jpeg',
    path: '/sar-segmented/sar_segmented_9.jpeg',
    originalPath: '/sar-segmented/WhatsApp%20Image%202026-09-22%20at%203.29.22%20PM.jpeg',
    timestamp: '2026-09-22 15:29:22 UTC',
    coordinates: { lat: 13.355, lon: 80.488, formatted: '13°21\'18.0"N 80°29\'16.8"E' },
    slickAreaKm2: 21.4,
    confidence: 98,
    sensor: 'Sentinel-1A SAR',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41985',
    status: 'Verified Spill'
  },
  {
    id: 10,
    title: 'SAR Segmented Anomaly #10',
    filename: 'sar_segmented_10.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.29.40 PM.jpeg',
    path: '/sar-segmented/sar_segmented_10.jpeg',
    originalPath: '/sar-segmented/WhatsApp%20Image%202026-09-22%20at%203.29.40%20PM.jpeg',
    timestamp: '2026-09-22 15:29:40 UTC',
    coordinates: { lat: 13.210, lon: 80.375, formatted: '13°12\'36.0"N 80°22\'30.0"E' },
    slickAreaKm2: 17.1,
    confidence: 96,
    sensor: 'Sentinel-1A SAR',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41985',
    status: 'High Risk Slick'
  },
  {
    id: 11,
    title: 'SAR Segmented Anomaly #11',
    filename: 'sar_segmented_11.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.32.02 PM.jpeg',
    path: '/sar-segmented/sar_segmented_11.jpeg',
    originalPath: '/sar-segmented/WhatsApp%20Image%202026-09-22%20at%203.32.02%20PM.jpeg',
    timestamp: '2026-09-22 15:32:02 UTC',
    coordinates: { lat: 13.150, lon: 80.290, formatted: '13°09\'00.0"N 80°17\'24.0"E' },
    slickAreaKm2: 7.9,
    confidence: 90,
    sensor: 'Sentinel-1B SAR',
    polarization: 'VH',
    orbitPass: 'DESCENDING #38418',
    status: 'Monitored Region'
  },
  {
    id: 12,
    title: 'SAR Segmented Anomaly #12',
    filename: 'sar_segmented_12.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.32.19 PM.jpeg',
    path: '/sar-segmented/sar_segmented_12.jpeg',
    originalPath: '/sar-segmented/WhatsApp%20Image%202026-09-22%20at%203.32.19%20PM.jpeg',
    timestamp: '2026-09-22 15:32:19 UTC',
    coordinates: { lat: 13.280, lon: 80.450, formatted: '13°16\'48.0"N 80°27\'00.0"E' },
    slickAreaKm2: 10.5,
    confidence: 92,
    sensor: 'Sentinel-1A SAR',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41986',
    status: 'Flagged Anomaly'
  },
  {
    id: 13,
    title: 'SAR Segmented Anomaly #13',
    filename: 'sar_segmented_13.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.32.30 PM.jpeg',
    path: '/sar-segmented/sar_segmented_13.jpeg',
    originalPath: '/sar-segmented/WhatsApp%20Image%202026-09-22%20at%203.32.30%20PM.jpeg',
    timestamp: '2026-09-22 15:32:30 UTC',
    coordinates: { lat: 13.390, lon: 80.580, formatted: '13°23\'24.0"N 80°34\'48.0"E' },
    slickAreaKm2: 13.4,
    confidence: 94,
    sensor: 'Sentinel-1A SAR',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41986',
    status: 'High Risk Slick'
  },
  {
    id: 14,
    title: 'SAR Segmented Anomaly #14',
    filename: 'sar_segmented_14.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.32.42 PM.jpeg',
    path: '/sar-segmented/sar_segmented_14.jpeg',
    originalPath: '/sar-segmented/WhatsApp%20Image%202026-09-22%20at%203.32.42%20PM.jpeg',
    timestamp: '2026-09-22 15:32:42 UTC',
    coordinates: { lat: 13.220, lon: 80.390, formatted: '13°13\'12.0"N 80°23\'24.0"E' },
    slickAreaKm2: 18.3,
    confidence: 96,
    sensor: 'Sentinel-1A SAR',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41987',
    status: 'Verified Spill'
  },
  {
    id: 15,
    title: 'SAR Segmented Anomaly #15',
    filename: 'sar_segmented_15.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.33.00 PM.jpeg',
    path: '/sar-segmented/sar_segmented_15.jpeg',
    originalPath: '/sar-segmented/WhatsApp%20Image%202026-09-22%20at%203.33.00%20PM.jpeg',
    timestamp: '2026-09-22 15:33:00 UTC',
    coordinates: { lat: 13.165, lon: 80.320, formatted: '13°09\'54.0"N 80°19\'12.0"E' },
    slickAreaKm2: 16.0,
    confidence: 95,
    sensor: 'Sentinel-1A SAR',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41987',
    status: 'Verified Spill'
  }
];

export function getSarImage(idOrIndex: number | string): SarSegmentedImage {
  if (typeof idOrIndex === 'number') {
    const idx = Math.max(1, Math.min(idOrIndex, SAR_SEGMENTED_IMAGES.length));
    return SAR_SEGMENTED_IMAGES[idx - 1];
  }
  const found = SAR_SEGMENTED_IMAGES.find(
    img => img.filename === idOrIndex || img.originalFilename === idOrIndex || img.title.toLowerCase().includes(idOrIndex.toLowerCase())
  );
  return found || SAR_SEGMENTED_IMAGES[0];
}

export function getSarImagePath(idOrIndex: number | string, useOriginal: boolean = false): string {
  const img = getSarImage(idOrIndex);
  return useOriginal ? img.originalPath : img.path;
}
