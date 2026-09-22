export interface SarValidationMetrics {
  status: string;
  confidence: number;
  windSpeed: string;
  windStatus: string;
  oceanCurrent: string;
  currentStatus: string;
  waveHeight: string;
  waveStatus: string;
  sentinel3Chla: string;
  chlaStatus: string;
  lookAlikeCheck: string;
}

export interface SarSegmentedImage {
  id: number;
  targetCode: string; // e.g. SPILL-01
  title: string;
  locationName: string;
  filename: string;
  originalFilename: string;
  path: string;
  timestamp: string;
  coordinates: {
    lat: number;
    lon: number;
    formatted: string;
  };
  slickAreaKm2: number;
  confidence: number;
  sensor: string;
  productType: string;
  polarization: string;
  orbitPass: string;
  model: string;
  input: string;
  imageSize: string;
  perimeterKm: number;
  vertices: number;
  validation: SarValidationMetrics;
}

export const SAR_SEGMENTED_IMAGES: SarSegmentedImage[] = [
  {
    id: 1,
    targetCode: 'SPILL-01',
    title: 'Chennai Outer Anchorage Slick',
    locationName: 'Chennai Outer Anchorage',
    filename: 'sar_segmented_1.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.22.34 PM.jpeg',
    path: '/sar-segmented/sar_segmented_1.jpeg',
    timestamp: '22 Sep 2026 04:15:32 PM',
    coordinates: { lat: 13.182, lon: 80.314, formatted: '13.182° N, 80.314° E' },
    slickAreaKm2: 12.8,
    confidence: 94,
    sensor: 'Sentinel-1A SAR',
    productType: 'IW_GRDH_1S',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41982',
    model: 'U-Net (ResNet-50)',
    input: 'VV + VH (2-channel)',
    imageSize: '1024 x 1024',
    perimeterKm: 18.72,
    vertices: 42,
    validation: {
      status: 'Likely Oil Spill',
      confidence: 80.2,
      windSpeed: '6.2 m/s',
      windStatus: 'Normal',
      oceanCurrent: '0.4 m/s',
      currentStatus: 'Normal',
      waveHeight: '1.1 m',
      waveStatus: 'Normal',
      sentinel3Chla: '0.12 mg/m³',
      chlaStatus: 'Low',
      lookAlikeCheck: 'No strong match'
    }
  },
  {
    id: 2,
    targetCode: 'SPILL-02',
    title: 'Ennore Port Approach Slick',
    locationName: 'Ennore Port Approach',
    filename: 'sar_segmented_2.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.22.49 PM.jpeg',
    path: '/sar-segmented/sar_segmented_2.jpeg',
    timestamp: '22 Sep 2026 04:22:15 PM',
    coordinates: { lat: 13.245, lon: 80.412, formatted: '13.245° N, 80.412° E' },
    slickAreaKm2: 8.4,
    confidence: 91,
    sensor: 'Sentinel-1A SAR',
    productType: 'IW_GRDH_1S',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41982',
    model: 'U-Net (ResNet-50)',
    input: 'VV + VH (2-channel)',
    imageSize: '1024 x 1024',
    perimeterKm: 14.15,
    vertices: 36,
    validation: {
      status: 'Likely Oil Spill',
      confidence: 84.5,
      windSpeed: '5.8 m/s',
      windStatus: 'Normal',
      oceanCurrent: '0.5 m/s',
      currentStatus: 'Normal',
      waveHeight: '0.9 m',
      waveStatus: 'Normal',
      sentinel3Chla: '0.15 mg/m³',
      chlaStatus: 'Low',
      lookAlikeCheck: 'No strong match'
    }
  },
  {
    id: 3,
    targetCode: 'SPILL-03',
    title: 'Kattupalli Channel Anomaly',
    locationName: 'Kattupalli Offshore',
    filename: 'sar_segmented_3.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.23.09 PM.jpeg',
    path: '/sar-segmented/sar_segmented_3.jpeg',
    timestamp: '22 Sep 2026 04:30:00 PM',
    coordinates: { lat: 13.104, lon: 80.288, formatted: '13.104° N, 80.288° E' },
    slickAreaKm2: 15.2,
    confidence: 96,
    sensor: 'Sentinel-1B SAR',
    productType: 'IW_GRDH_1S',
    polarization: 'VV + VH',
    orbitPass: 'DESCENDING #38411',
    model: 'U-Net (ResNet-50)',
    input: 'VV + VH (2-channel)',
    imageSize: '1024 x 1024',
    perimeterKm: 22.40,
    vertices: 58,
    validation: {
      status: 'Confirmed Spill',
      confidence: 89.1,
      windSpeed: '4.5 m/s',
      windStatus: 'Low Wind',
      oceanCurrent: '0.6 m/s',
      currentStatus: 'Normal',
      waveHeight: '0.8 m',
      waveStatus: 'Calm',
      sentinel3Chla: '0.10 mg/m³',
      chlaStatus: 'Low',
      lookAlikeCheck: 'Biogenic lookalike unlikely'
    }
  },
  {
    id: 4,
    targetCode: 'SPILL-04',
    title: 'Coromandel Deepwater Plume',
    locationName: 'Coromandel Offshore',
    filename: 'sar_segmented_4.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.23.34 PM.jpeg',
    path: '/sar-segmented/sar_segmented_4.jpeg',
    timestamp: '22 Sep 2026 04:35:40 PM',
    coordinates: { lat: 13.310, lon: 80.520, formatted: '13.310° N, 80.520° E' },
    slickAreaKm2: 19.6,
    confidence: 97,
    sensor: 'Sentinel-1A SAR',
    productType: 'IW_GRDH_1S',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41983',
    model: 'U-Net (ResNet-50)',
    input: 'VV + VH (2-channel)',
    imageSize: '1024 x 1024',
    perimeterKm: 28.10,
    vertices: 64,
    validation: {
      status: 'Confirmed Spill',
      confidence: 92.4,
      windSpeed: '7.1 m/s',
      windStatus: 'Normal',
      oceanCurrent: '0.7 m/s',
      currentStatus: 'Moderate',
      waveHeight: '1.4 m',
      waveStatus: 'Normal',
      sentinel3Chla: '0.08 mg/m³',
      chlaStatus: 'Very Low',
      lookAlikeCheck: 'No match'
    }
  },
  {
    id: 5,
    targetCode: 'SPILL-05',
    title: 'Marina Coastal Buffer Zone',
    locationName: 'Marina Coastal Shelf',
    filename: 'sar_segmented_5.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.23.49 PM.jpeg',
    path: '/sar-segmented/sar_segmented_5.jpeg',
    timestamp: '22 Sep 2026 04:42:10 PM',
    coordinates: { lat: 13.080, lon: 80.201, formatted: '13.080° N, 80.201° E' },
    slickAreaKm2: 6.1,
    confidence: 89,
    sensor: 'Sentinel-1B SAR',
    productType: 'IW_GRDH_1S',
    polarization: 'VV + VH',
    orbitPass: 'DESCENDING #38412',
    model: 'U-Net (ResNet-50)',
    input: 'VV + VH (2-channel)',
    imageSize: '1024 x 1024',
    perimeterKm: 11.20,
    vertices: 28,
    validation: {
      status: 'Unverified Slick',
      confidence: 72.8,
      windSpeed: '8.4 m/s',
      windStatus: 'Breezy',
      oceanCurrent: '0.3 m/s',
      currentStatus: 'Normal',
      waveHeight: '1.6 m',
      waveStatus: 'Choppy',
      sentinel3Chla: '0.35 mg/m³',
      chlaStatus: 'Moderate',
      lookAlikeCheck: 'Possible algal bloom'
    }
  },
  {
    id: 6,
    targetCode: 'SPILL-06',
    title: 'Pondicherry Bight Anomaly',
    locationName: 'Pondicherry Offshore',
    filename: 'sar_segmented_6.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.28.39 PM.jpeg',
    path: '/sar-segmented/sar_segmented_6.jpeg',
    timestamp: '22 Sep 2026 04:50:00 PM',
    coordinates: { lat: 13.199, lon: 80.340, formatted: '13.199° N, 80.340° E' },
    slickAreaKm2: 11.3,
    confidence: 93,
    sensor: 'Sentinel-1A SAR',
    productType: 'IW_GRDH_1S',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41984',
    model: 'U-Net (ResNet-50)',
    input: 'VV + VH (2-channel)',
    imageSize: '1024 x 1024',
    perimeterKm: 16.80,
    vertices: 40,
    validation: {
      status: 'Likely Oil Spill',
      confidence: 81.0,
      windSpeed: '6.0 m/s',
      windStatus: 'Normal',
      oceanCurrent: '0.4 m/s',
      currentStatus: 'Normal',
      waveHeight: '1.0 m',
      waveStatus: 'Normal',
      sentinel3Chla: '0.14 mg/m³',
      chlaStatus: 'Low',
      lookAlikeCheck: 'No strong match'
    }
  },
  {
    id: 7,
    targetCode: 'SPILL-07',
    title: 'Pulicat Lake Mouth Spill',
    locationName: 'Pulicat Marine Sector',
    filename: 'sar_segmented_7.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.28.53 PM.jpeg',
    path: '/sar-segmented/sar_segmented_7.jpeg',
    timestamp: '22 Sep 2026 04:55:22 PM',
    coordinates: { lat: 13.412, lon: 80.601, formatted: '13.412° N, 80.601° E' },
    slickAreaKm2: 14.7,
    confidence: 95,
    sensor: 'Sentinel-1A SAR',
    productType: 'IW_GRDH_1S',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41984',
    model: 'U-Net (ResNet-50)',
    input: 'VV + VH (2-channel)',
    imageSize: '1024 x 1024',
    perimeterKm: 20.90,
    vertices: 50,
    validation: {
      status: 'Confirmed Spill',
      confidence: 88.5,
      windSpeed: '5.5 m/s',
      windStatus: 'Normal',
      oceanCurrent: '0.5 m/s',
      currentStatus: 'Normal',
      waveHeight: '0.9 m',
      waveStatus: 'Normal',
      sentinel3Chla: '0.11 mg/m³',
      chlaStatus: 'Low',
      lookAlikeCheck: 'Low lookalike risk'
    }
  },
  {
    id: 8,
    targetCode: 'SPILL-08',
    title: 'Royapuram Anchorage Slick',
    locationName: 'Royapuram Harbor Outer',
    filename: 'sar_segmented_8.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.29.05 PM.jpeg',
    path: '/sar-segmented/sar_segmented_8.jpeg',
    timestamp: '22 Sep 2026 05:01:10 PM',
    coordinates: { lat: 13.015, lon: 80.190, formatted: '13.015° N, 80.190° E' },
    slickAreaKm2: 9.8,
    confidence: 92,
    sensor: 'Sentinel-1B SAR',
    productType: 'IW_GRDH_1S',
    polarization: 'VV + VH',
    orbitPass: 'DESCENDING #38415',
    model: 'U-Net (ResNet-50)',
    input: 'VV + VH (2-channel)',
    imageSize: '1024 x 1024',
    perimeterKm: 15.30,
    vertices: 38,
    validation: {
      status: 'Likely Oil Spill',
      confidence: 79.4,
      windSpeed: '6.5 m/s',
      windStatus: 'Normal',
      oceanCurrent: '0.4 m/s',
      currentStatus: 'Normal',
      waveHeight: '1.2 m',
      waveStatus: 'Normal',
      sentinel3Chla: '0.18 mg/m³',
      chlaStatus: 'Low-Med',
      lookAlikeCheck: 'No strong match'
    }
  },
  {
    id: 9,
    targetCode: 'SPILL-09',
    title: 'Mahabalipuram Sea Corridor',
    locationName: 'Mahabalipuram Offshore',
    filename: 'sar_segmented_9.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.29.22 PM.jpeg',
    path: '/sar-segmented/sar_segmented_9.jpeg',
    timestamp: '22 Sep 2026 05:08:45 PM',
    coordinates: { lat: 13.355, lon: 80.488, formatted: '13.355° N, 80.488° E' },
    slickAreaKm2: 21.4,
    confidence: 98,
    sensor: 'Sentinel-1A SAR',
    productType: 'IW_GRDH_1S',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41985',
    model: 'U-Net (ResNet-50)',
    input: 'VV + VH (2-channel)',
    imageSize: '1024 x 1024',
    perimeterKm: 31.50,
    vertices: 72,
    validation: {
      status: 'Confirmed Spill',
      confidence: 95.2,
      windSpeed: '4.8 m/s',
      windStatus: 'Calm',
      oceanCurrent: '0.6 m/s',
      currentStatus: 'Normal',
      waveHeight: '0.7 m',
      waveStatus: 'Smooth',
      sentinel3Chla: '0.07 mg/m³',
      chlaStatus: 'Very Low',
      lookAlikeCheck: 'High confidence hydrocarbon'
    }
  },
  {
    id: 10,
    targetCode: 'SPILL-10',
    title: 'Ennore Thermal Channel Anomaly',
    locationName: 'Ennore Thermal Outfall',
    filename: 'sar_segmented_10.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.29.40 PM.jpeg',
    path: '/sar-segmented/sar_segmented_10.jpeg',
    timestamp: '22 Sep 2026 05:14:00 PM',
    coordinates: { lat: 13.210, lon: 80.375, formatted: '13.210° N, 80.375° E' },
    slickAreaKm2: 17.1,
    confidence: 96,
    sensor: 'Sentinel-1A SAR',
    productType: 'IW_GRDH_1S',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41985',
    model: 'U-Net (ResNet-50)',
    input: 'VV + VH (2-channel)',
    imageSize: '1024 x 1024',
    perimeterKm: 25.10,
    vertices: 56,
    validation: {
      status: 'Confirmed Spill',
      confidence: 90.8,
      windSpeed: '5.9 m/s',
      windStatus: 'Normal',
      oceanCurrent: '0.5 m/s',
      currentStatus: 'Normal',
      waveHeight: '1.0 m',
      waveStatus: 'Normal',
      sentinel3Chla: '0.13 mg/m³',
      chlaStatus: 'Low',
      lookAlikeCheck: 'Thermal discharge ruled out'
    }
  },
  {
    id: 11,
    targetCode: 'SPILL-11',
    title: 'Kovalam Bay Slick Finger',
    locationName: 'Kovalam Marine Shelf',
    filename: 'sar_segmented_11.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.32.02 PM.jpeg',
    path: '/sar-segmented/sar_segmented_11.jpeg',
    timestamp: '22 Sep 2026 05:20:18 PM',
    coordinates: { lat: 13.150, lon: 80.290, formatted: '13.150° N, 80.290° E' },
    slickAreaKm2: 7.9,
    confidence: 90,
    sensor: 'Sentinel-1B SAR',
    productType: 'IW_GRDH_1S',
    polarization: 'VV + VH',
    orbitPass: 'DESCENDING #38418',
    model: 'U-Net (ResNet-50)',
    input: 'VV + VH (2-channel)',
    imageSize: '1024 x 1024',
    perimeterKm: 13.60,
    vertices: 32,
    validation: {
      status: 'Likely Oil Spill',
      confidence: 76.5,
      windSpeed: '6.7 m/s',
      windStatus: 'Normal',
      oceanCurrent: '0.4 m/s',
      currentStatus: 'Normal',
      waveHeight: '1.3 m',
      waveStatus: 'Normal',
      sentinel3Chla: '0.22 mg/m³',
      chlaStatus: 'Moderate',
      lookAlikeCheck: 'No strong match'
    }
  },
  {
    id: 12,
    targetCode: 'SPILL-12',
    title: 'Sriharikota Outer Transit Way',
    locationName: 'Sriharikota Offshore',
    filename: 'sar_segmented_12.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.32.19 PM.jpeg',
    path: '/sar-segmented/sar_segmented_12.jpeg',
    timestamp: '22 Sep 2026 05:26:00 PM',
    coordinates: { lat: 13.280, lon: 80.450, formatted: '13.280° N, 80.450° E' },
    slickAreaKm2: 10.5,
    confidence: 92,
    sensor: 'Sentinel-1A SAR',
    productType: 'IW_GRDH_1S',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41986',
    model: 'U-Net (ResNet-50)',
    input: 'VV + VH (2-channel)',
    imageSize: '1024 x 1024',
    perimeterKm: 15.90,
    vertices: 44,
    validation: {
      status: 'Likely Oil Spill',
      confidence: 82.0,
      windSpeed: '5.2 m/s',
      windStatus: 'Normal',
      oceanCurrent: '0.5 m/s',
      currentStatus: 'Normal',
      waveHeight: '0.9 m',
      waveStatus: 'Normal',
      sentinel3Chla: '0.14 mg/m³',
      chlaStatus: 'Low',
      lookAlikeCheck: 'No strong match'
    }
  },
  {
    id: 13,
    targetCode: 'SPILL-13',
    title: 'Kasimedu Fishing Dock Exit',
    locationName: 'Kasimedu Basin Entrance',
    filename: 'sar_segmented_13.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.32.30 PM.jpeg',
    path: '/sar-segmented/sar_segmented_13.jpeg',
    timestamp: '22 Sep 2026 05:31:40 PM',
    coordinates: { lat: 13.390, lon: 80.580, formatted: '13.390° N, 80.580° E' },
    slickAreaKm2: 13.4,
    confidence: 94,
    sensor: 'Sentinel-1A SAR',
    productType: 'IW_GRDH_1S',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41986',
    model: 'U-Net (ResNet-50)',
    input: 'VV + VH (2-channel)',
    imageSize: '1024 x 1024',
    perimeterKm: 19.40,
    vertices: 48,
    validation: {
      status: 'Confirmed Spill',
      confidence: 87.3,
      windSpeed: '6.1 m/s',
      windStatus: 'Normal',
      oceanCurrent: '0.4 m/s',
      currentStatus: 'Normal',
      waveHeight: '1.1 m',
      waveStatus: 'Normal',
      sentinel3Chla: '0.16 mg/m³',
      chlaStatus: 'Low',
      lookAlikeCheck: 'Bunker fuel signature'
    }
  },
  {
    id: 14,
    targetCode: 'SPILL-14',
    title: 'Outer Tanker Anchorage Spot 4',
    locationName: 'Chennai Outer Tanker Zone',
    filename: 'sar_segmented_14.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.32.42 PM.jpeg',
    path: '/sar-segmented/sar_segmented_14.jpeg',
    timestamp: '22 Sep 2026 05:37:05 PM',
    coordinates: { lat: 13.220, lon: 80.390, formatted: '13.220° N, 80.390° E' },
    slickAreaKm2: 18.3,
    confidence: 96,
    sensor: 'Sentinel-1A SAR',
    productType: 'IW_GRDH_1S',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41987',
    model: 'U-Net (ResNet-50)',
    input: 'VV + VH (2-channel)',
    imageSize: '1024 x 1024',
    perimeterKm: 26.80,
    vertices: 60,
    validation: {
      status: 'Confirmed Spill',
      confidence: 91.5,
      windSpeed: '5.0 m/s',
      windStatus: 'Normal',
      oceanCurrent: '0.6 m/s',
      currentStatus: 'Normal',
      waveHeight: '0.8 m',
      waveStatus: 'Smooth',
      sentinel3Chla: '0.09 mg/m³',
      chlaStatus: 'Very Low',
      lookAlikeCheck: 'Tanker wash slick match'
    }
  },
  {
    id: 15,
    targetCode: 'SPILL-15',
    title: 'Adyar River Outfall Plume',
    locationName: 'Adyar Estuary Offshore',
    filename: 'sar_segmented_15.jpeg',
    originalFilename: 'WhatsApp Image 2026-09-22 at 3.33.00 PM.jpeg',
    path: '/sar-segmented/sar_segmented_15.jpeg',
    timestamp: '22 Sep 2026 05:42:15 PM',
    coordinates: { lat: 13.165, lon: 80.320, formatted: '13.165° N, 80.320° E' },
    slickAreaKm2: 16.0,
    confidence: 95,
    sensor: 'Sentinel-1A SAR',
    productType: 'IW_GRDH_1S',
    polarization: 'VV + VH',
    orbitPass: 'ASCENDING #41987',
    model: 'U-Net (ResNet-50)',
    input: 'VV + VH (2-channel)',
    imageSize: '1024 x 1024',
    perimeterKm: 23.40,
    vertices: 52,
    validation: {
      status: 'Confirmed Spill',
      confidence: 89.4,
      windSpeed: '5.6 m/s',
      windStatus: 'Normal',
      oceanCurrent: '0.5 m/s',
      currentStatus: 'Normal',
      waveHeight: '1.0 m',
      waveStatus: 'Normal',
      sentinel3Chla: '0.12 mg/m³',
      chlaStatus: 'Low',
      lookAlikeCheck: 'Hydrocarbon verified'
    }
  }
];

export function getSarImage(idOrCode: number | string): SarSegmentedImage {
  if (typeof idOrCode === 'number') {
    const idx = Math.max(1, Math.min(idOrCode, SAR_SEGMENTED_IMAGES.length));
    return SAR_SEGMENTED_IMAGES[idx - 1];
  }
  const found = SAR_SEGMENTED_IMAGES.find(
    img => img.targetCode.toLowerCase() === idOrCode.toLowerCase() ||
      img.filename === idOrCode ||
      img.originalFilename === idOrCode ||
      img.title.toLowerCase().includes(idOrCode.toLowerCase())
  );
  return found || SAR_SEGMENTED_IMAGES[0];
}

export function getSarImagePath(idOrCode: number | string): string {
  return getSarImage(idOrCode).path;
}
