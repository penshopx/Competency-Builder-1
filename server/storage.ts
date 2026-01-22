import { randomUUID } from "crypto";
import type { 
  CompetencyCluster, 
  UnitCompetency, 
  ECourse, 
  Participant, 
  Evidence,
  Assessment,
  DashboardStats,
  HeatmapData,
  InsertParticipant,
  InsertEvidence,
  InsertCourse,
  Lesson,
  ParticipantCompetency,
  LearningRecord
} from "@shared/schema";

// Sample data imports (replicated from client for server use)
const competencyClusters: CompetencyCluster[] = [
  {
    id: "cluster-smap",
    code: "SMAP",
    name: "SMAP",
    fullName: "Strategic Management & Analytical Planning",
    description: "Mengembangkan kemampuan berpikir strategis, analisis, dan pengambilan keputusan berbasis data.",
    color: "hsl(199 89% 48%)"
  },
  {
    id: "cluster-pancek",
    code: "PANCEK",
    name: "PANCEK",
    fullName: "Planning, Action, Negotiation, Communication, Execution",
    description: "Membangun kompetensi eksekusi, komunikasi, dan kolaborasi kerja.",
    color: "hsl(172 66% 50%)"
  }
];

const smapUnits: UnitCompetency[] = [
  {
    id: "smap-01",
    clusterId: "cluster-smap",
    code: "SMAP-01",
    name: "Analisis Masalah Strategis",
    description: "Kemampuan mengidentifikasi, menganalisis, dan memilah masalah strategis vs operasional.",
    indicators: [
      { level: "L1", indicators: ["Mengenali jenis-jenis masalah organisasi", "Memahami perbedaan isu strategis dan operasional"] },
      { level: "L2", indicators: ["Mengidentifikasi akar masalah dengan metode standar", "Menganalisis dampak masalah pada unit kerja"] },
      { level: "L3", indicators: ["Mensintesis masalah dari berbagai perspektif", "Menggunakan multi-metode analisis"] },
      { level: "L4", indicators: ["Menentukan prioritas isu strategis organisasi", "Mengarahkan tim dalam analisis sistemik"] }
    ]
  },
  {
    id: "smap-02",
    clusterId: "cluster-smap",
    code: "SMAP-02",
    name: "Perumusan Opsi Strategi",
    description: "Kemampuan merumuskan dan mengevaluasi alternatif strategi yang relevan.",
    indicators: [
      { level: "L1", indicators: ["Memahami konsep strategi dan opsi", "Mengenali contoh strategi yang ada"] },
      { level: "L2", indicators: ["Membuat alternatif solusi sederhana", "Mengevaluasi kelebihan dan kekurangan opsi"] },
      { level: "L3", indicators: ["Merumuskan opsi strategis berbasis analisis", "Menilai risiko dan dampak setiap opsi"] },
      { level: "L4", indicators: ["Menetapkan strategi organisasi", "Mengintegrasikan strategi lintas unit"] }
    ]
  },
  {
    id: "smap-03",
    clusterId: "cluster-smap",
    code: "SMAP-03",
    name: "Pengambilan Keputusan Berbasis Data",
    description: "Kemampuan menggunakan data dan fakta untuk pengambilan keputusan yang tepat.",
    indicators: [
      { level: "L1", indicators: ["Membaca dan memahami data dasar", "Mengenali jenis-jenis data yang relevan"] },
      { level: "L2", indicators: ["Menggunakan data untuk mendukung keputusan", "Membuat analisis data sederhana"] },
      { level: "L3", indicators: ["Menghasilkan insight dari data kompleks", "Menghubungkan data dengan konteks strategis"] },
      { level: "L4", indicators: ["Membangun governance keputusan berbasis data", "Mengarahkan kebijakan data-driven"] }
    ]
  },
  {
    id: "smap-04",
    clusterId: "cluster-smap",
    code: "SMAP-04",
    name: "Monitoring & Evaluasi Strategi",
    description: "Kemampuan memantau pelaksanaan strategi dan mengevaluasi efektivitasnya.",
    indicators: [
      { level: "L1", indicators: ["Memahami indikator kinerja", "Mengenali proses monitoring dasar"] },
      { level: "L2", indicators: ["Melakukan monitoring rutin", "Membuat laporan progress"] },
      { level: "L3", indicators: ["Mengevaluasi dampak strategi", "Mengidentifikasi area perbaikan"] },
      { level: "L4", indicators: ["Melakukan re-design strategi", "Membangun sistem evaluasi berkelanjutan"] }
    ]
  }
];

const pancekUnits: UnitCompetency[] = [
  {
    id: "pan-01",
    clusterId: "cluster-pancek",
    code: "PAN-01",
    name: "Perencanaan Kerja Efektif",
    description: "Kemampuan menyusun dan mengoptimalkan rencana kerja yang realistis dan terukur.",
    indicators: [
      { level: "L1", indicators: ["Mengikuti rencana yang diberikan", "Memahami komponen rencana kerja"] },
      { level: "L2", indicators: ["Menyusun rencana kerja mandiri", "Mengidentifikasi sumber daya yang dibutuhkan"] },
      { level: "L3", indicators: ["Mengoptimasi rencana untuk efisiensi", "Mengantisipasi hambatan dan risiko"] },
      { level: "L4", indicators: ["Mensinkronisasi rencana lintas tim", "Membangun sistem perencanaan terintegrasi"] }
    ]
  },
  {
    id: "pan-02",
    clusterId: "cluster-pancek",
    code: "PAN-02",
    name: "Komunikasi & Negosiasi",
    description: "Kemampuan berkomunikasi efektif dan melakukan negosiasi untuk mencapai kesepakatan.",
    indicators: [
      { level: "L1", indicators: ["Menyampaikan informasi dengan jelas", "Mendengarkan dengan baik"] },
      { level: "L2", indicators: ["Melakukan negosiasi dasar", "Menyesuaikan gaya komunikasi"] },
      { level: "L3", indicators: ["Mempengaruhi pemangku kepentingan", "Mengelola konflik secara efektif"] },
      { level: "L4", indicators: ["Mengelola stakeholder strategis", "Membangun komunikasi organisasi"] }
    ]
  },
  {
    id: "pan-03",
    clusterId: "cluster-pancek",
    code: "PAN-03",
    name: "Eksekusi & Problem Solving",
    description: "Kemampuan menjalankan rencana dan menyelesaikan masalah yang muncul dalam proses kerja.",
    indicators: [
      { level: "L1", indicators: ["Menjalankan tugas sesuai instruksi", "Melaporkan hambatan yang ditemui"] },
      { level: "L2", indicators: ["Menyelesaikan masalah operasional", "Mencari solusi alternatif"] },
      { level: "L3", indicators: ["Mencapai delivery excellence", "Mengelola prioritas kompleks"] },
      { level: "L4", indicators: ["Mengambil keputusan dalam krisis", "Membangun kapasitas problem solving tim"] }
    ]
  },
  {
    id: "pan-04",
    clusterId: "cluster-pancek",
    code: "PAN-04",
    name: "Kolaborasi & Akuntabilitas",
    description: "Kemampuan bekerja sama dalam tim dan bertanggung jawab atas hasil kerja.",
    indicators: [
      { level: "L1", indicators: ["Bekerja dalam tim dengan baik", "Memenuhi tanggung jawab individu"] },
      { level: "L2", indicators: ["Berkoordinasi dengan unit lain", "Mengelola tanggung jawab bersama"] },
      { level: "L3", indicators: ["Membangun sinergi lintas fungsi", "Mendorong akuntabilitas tim"] },
      { level: "L4", indicators: ["Membangun budaya kinerja", "Menciptakan sistem kolaborasi organisasi"] }
    ]
  }
];

const initialParticipants: Participant[] = [
  {
    id: "p-001",
    nip: "198501012010011001",
    name: "Andi Pratama",
    position: "Staf Senior",
    unit: "Operasional",
    email: "andi.pratama@org.go.id",
    competencies: [
      { unitId: "smap-01", currentLevel: "L1", targetLevel: "L2", lastAssessed: "2025-01-10", status: "gap" },
      { unitId: "smap-02", currentLevel: "L1", targetLevel: "L2", lastAssessed: "2025-01-10", status: "gap" },
      { unitId: "pan-01", currentLevel: "L2", targetLevel: "L2", lastAssessed: "2025-01-10", status: "achieved" },
      { unitId: "pan-03", currentLevel: "L1", targetLevel: "L2", lastAssessed: "2025-01-10", status: "gap" }
    ],
    learningHistory: [
      { id: "lr-1", courseId: "course-pan03-l2", startedAt: "2025-01-15", progress: 60, status: "in_progress" }
    ],
    evidences: []
  },
  {
    id: "p-002",
    nip: "198702152012012002",
    name: "Budi Santoso",
    position: "Supervisor",
    unit: "Operasional",
    email: "budi.santoso@org.go.id",
    competencies: [
      { unitId: "smap-01", currentLevel: "L2", targetLevel: "L3", lastAssessed: "2025-01-08", status: "gap" },
      { unitId: "smap-02", currentLevel: "L2", targetLevel: "L3", lastAssessed: "2025-01-08", status: "gap" },
      { unitId: "pan-01", currentLevel: "L2", targetLevel: "L3", lastAssessed: "2025-01-08", status: "gap" },
      { unitId: "pan-03", currentLevel: "L2", targetLevel: "L3", lastAssessed: "2025-01-08", status: "on_track" }
    ],
    learningHistory: [
      { id: "lr-2", courseId: "course-smap01-l2", startedAt: "2025-01-12", completedAt: "2025-01-18", progress: 100, status: "completed" }
    ],
    evidences: [
      { id: "ev-1", unitId: "smap-01", type: "document", title: "Analisis Kasus Unit", description: "Analisis masalah strategis unit operasional", submittedAt: "2025-01-18", status: "approved", score: 85, feedback: "Analisis komprehensif" }
    ]
  },
  {
    id: "p-003",
    nip: "198303032008032003",
    name: "Citra Dewi",
    position: "Manager",
    unit: "Support",
    email: "citra.dewi@org.go.id",
    competencies: [
      { unitId: "smap-01", currentLevel: "L3", targetLevel: "L3", lastAssessed: "2025-01-05", status: "achieved" },
      { unitId: "smap-02", currentLevel: "L2", targetLevel: "L3", lastAssessed: "2025-01-05", status: "gap" },
      { unitId: "smap-03", currentLevel: "L3", targetLevel: "L3", lastAssessed: "2025-01-05", status: "achieved" },
      { unitId: "pan-02", currentLevel: "L3", targetLevel: "L3", lastAssessed: "2025-01-05", status: "achieved" }
    ],
    learningHistory: [],
    evidences: [
      { id: "ev-2", unitId: "smap-01", type: "presentation", title: "Strategic Analysis Presentation", description: "Presentasi analisis strategis Q4", submittedAt: "2025-01-05", status: "approved", score: 90 }
    ]
  },
  {
    id: "p-004",
    nip: "198004042005041004",
    name: "Dedi Kurniawan",
    position: "Manager",
    unit: "Operasional",
    email: "dedi.kurniawan@org.go.id",
    competencies: [
      { unitId: "smap-01", currentLevel: "L2", targetLevel: "L3", lastAssessed: "2025-01-12", status: "on_track" },
      { unitId: "smap-02", currentLevel: "L2", targetLevel: "L3", lastAssessed: "2025-01-12", status: "gap" },
      { unitId: "pan-01", currentLevel: "L1", targetLevel: "L3", lastAssessed: "2025-01-12", status: "gap" },
      { unitId: "pan-03", currentLevel: "L2", targetLevel: "L3", lastAssessed: "2025-01-12", status: "gap" }
    ],
    learningHistory: [
      { id: "lr-3", courseId: "course-smap01-l2", startedAt: "2025-01-14", progress: 80, status: "in_progress" }
    ],
    evidences: []
  },
  {
    id: "p-005",
    nip: "197505052000051005",
    name: "Eka Putra",
    position: "Senior Manager",
    unit: "Strategi",
    email: "eka.putra@org.go.id",
    competencies: [
      { unitId: "smap-01", currentLevel: "L4", targetLevel: "L4", lastAssessed: "2025-01-01", status: "achieved" },
      { unitId: "smap-02", currentLevel: "L4", targetLevel: "L4", lastAssessed: "2025-01-01", status: "achieved" },
      { unitId: "smap-03", currentLevel: "L3", targetLevel: "L4", lastAssessed: "2025-01-01", status: "on_track" },
      { unitId: "smap-04", currentLevel: "L4", targetLevel: "L4", lastAssessed: "2025-01-01", status: "achieved" }
    ],
    learningHistory: [],
    evidences: [
      { id: "ev-3", unitId: "smap-01", type: "document", title: "Strategic Brief 2025", description: "Dokumen strategi organisasi 2025", submittedAt: "2025-01-01", status: "approved", score: 95 }
    ]
  }
];

const initialCourses: ECourse[] = [
  {
    id: "course-smap01-l2",
    unitId: "smap-01",
    targetLevel: "L2",
    title: "Analisis Masalah Strategis - Level Application",
    description: "Kursus untuk mengembangkan kemampuan menganalisis masalah strategis dengan metode standar.",
    duration: "4 jam",
    lessons: [
      { id: "lesson-1", order: 1, type: "orientation", title: "Orientasi Kompetensi", description: "Memahami standar kompetensi", content: "Video pengantar" },
      { id: "lesson-2", order: 2, type: "context", title: "Konteks Dunia Nyata", description: "Studi kasus", content: "Case study" },
      { id: "lesson-3", order: 3, type: "microlearning", title: "Tools Analisis", description: "Tools analisis masalah", content: "SWOT, Fishbone, 5 Why" },
      { id: "lesson-4", order: 4, type: "practice", title: "Aktivitas Praktik", description: "Analisis kasus nyata", content: "Worksheet" },
      { id: "lesson-5", order: 5, type: "assessment", title: "Asesmen", description: "Project mini", content: "Upload evidensi" },
      { id: "lesson-6", order: 6, type: "reflection", title: "Refleksi", description: "Dokumentasi pembelajaran", content: "Refleksi terstruktur" }
    ],
    createdAt: "2025-01-15"
  },
  {
    id: "course-pan03-l2",
    unitId: "pan-03",
    targetLevel: "L2",
    title: "Eksekusi & Problem Solving - Level Application",
    description: "Kursus untuk mengembangkan kemampuan eksekusi dan pemecahan masalah operasional.",
    duration: "3 jam",
    lessons: [
      { id: "lesson-p1", order: 1, type: "orientation", title: "Orientasi Kompetensi", description: "Eksekusi vs kesibukan", content: "Video pengantar" },
      { id: "lesson-p2", order: 2, type: "context", title: "Studi Kasus", description: "Kasus eksekusi", content: "Case study" },
      { id: "lesson-p3", order: 3, type: "microlearning", title: "Execution Loop", description: "PDCA", content: "Framework" },
      { id: "lesson-p4", order: 4, type: "practice", title: "Real Work Assignment", description: "Masalah nyata", content: "Tugas praktik" },
      { id: "lesson-p5", order: 5, type: "assessment", title: "Review Evidensi", description: "Penilaian", content: "Upload" },
      { id: "lesson-p6", order: 6, type: "reflection", title: "Refleksi", description: "Apa yang berhasil", content: "Refleksi" }
    ],
    createdAt: "2025-01-18"
  }
];

export interface IStorage {
  // Clusters
  getClusters(): Promise<CompetencyCluster[]>;
  getCluster(id: string): Promise<CompetencyCluster | undefined>;
  
  // Units
  getUnits(): Promise<UnitCompetency[]>;
  getUnit(id: string): Promise<UnitCompetency | undefined>;
  getUnitsByCluster(clusterId: string): Promise<UnitCompetency[]>;
  
  // Courses
  getCourses(): Promise<ECourse[]>;
  getCourse(id: string): Promise<ECourse | undefined>;
  getCoursesByUnit(unitId: string): Promise<ECourse[]>;
  createCourse(data: InsertCourse): Promise<ECourse>;
  deleteCourse(id: string): Promise<boolean>;
  
  // Participants
  getParticipants(): Promise<Participant[]>;
  getParticipant(id: string): Promise<Participant | undefined>;
  createParticipant(data: InsertParticipant): Promise<Participant>;
  updateParticipantCompetencies(id: string, competencies: ParticipantCompetency[]): Promise<Participant | undefined>;
  deleteParticipant(id: string): Promise<boolean>;
  
  // Evidences
  addEvidence(participantId: string, data: InsertEvidence): Promise<Evidence>;
  updateEvidenceStatus(participantId: string, evidenceId: string, status: Evidence['status'], score?: number, feedback?: string): Promise<Evidence | undefined>;
  
  // Dashboard
  getDashboardStats(): Promise<DashboardStats>;
  getHeatmapData(): Promise<HeatmapData[]>;
}

export class MemStorage implements IStorage {
  private clusters: Map<string, CompetencyCluster>;
  private units: Map<string, UnitCompetency>;
  private courses: Map<string, ECourse>;
  private participants: Map<string, Participant>;

  constructor() {
    this.clusters = new Map(competencyClusters.map(c => [c.id, c]));
    this.units = new Map([...smapUnits, ...pancekUnits].map(u => [u.id, u]));
    this.courses = new Map(initialCourses.map(c => [c.id, c]));
    this.participants = new Map(initialParticipants.map(p => [p.id, p]));
  }

  // Clusters
  async getClusters(): Promise<CompetencyCluster[]> {
    return Array.from(this.clusters.values());
  }

  async getCluster(id: string): Promise<CompetencyCluster | undefined> {
    return this.clusters.get(id);
  }

  // Units
  async getUnits(): Promise<UnitCompetency[]> {
    return Array.from(this.units.values());
  }

  async getUnit(id: string): Promise<UnitCompetency | undefined> {
    return this.units.get(id);
  }

  async getUnitsByCluster(clusterId: string): Promise<UnitCompetency[]> {
    return Array.from(this.units.values()).filter(u => u.clusterId === clusterId);
  }

  // Courses
  async getCourses(): Promise<ECourse[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: string): Promise<ECourse | undefined> {
    return this.courses.get(id);
  }

  async getCoursesByUnit(unitId: string): Promise<ECourse[]> {
    return Array.from(this.courses.values()).filter(c => c.unitId === unitId);
  }

  async createCourse(data: InsertCourse): Promise<ECourse> {
    const id = `course-${randomUUID()}`;
    const unit = this.units.get(data.unitId);
    
    const defaultLessons: Lesson[] = [
      { id: `${id}-l1`, order: 1, type: "orientation", title: "Orientasi Kompetensi", description: "Memahami standar dan indikator", content: "" },
      { id: `${id}-l2`, order: 2, type: "context", title: "Konteks Dunia Nyata", description: "Studi kasus dan tantangan", content: "" },
      { id: `${id}-l3`, order: 3, type: "microlearning", title: "Micro Learning", description: "Materi ringkas dan modular", content: "" },
      { id: `${id}-l4`, order: 4, type: "practice", title: "Aktivitas Praktik", description: "Tugas berbasis kerja nyata", content: "" },
      { id: `${id}-l5`, order: 5, type: "assessment", title: "Asesmen Kompetensi", description: "Penilaian berbasis evidensi", content: "" },
      { id: `${id}-l6`, order: 6, type: "reflection", title: "Refleksi & Evidensi", description: "Dokumentasi pembelajaran", content: "" }
    ];

    const course: ECourse = {
      id,
      unitId: data.unitId,
      targetLevel: data.targetLevel,
      title: data.title,
      description: data.description,
      duration: data.duration,
      lessons: defaultLessons,
      createdAt: new Date().toISOString().split('T')[0]
    };

    this.courses.set(id, course);
    return course;
  }

  async deleteCourse(id: string): Promise<boolean> {
    if (!this.courses.has(id)) return false;
    return this.courses.delete(id);
  }

  // Participants
  async getParticipants(): Promise<Participant[]> {
    return Array.from(this.participants.values());
  }

  async getParticipant(id: string): Promise<Participant | undefined> {
    return this.participants.get(id);
  }

  async createParticipant(data: InsertParticipant): Promise<Participant> {
    const id = `p-${randomUUID()}`;
    const participant: Participant = {
      id,
      nip: data.nip,
      name: data.name,
      position: data.position,
      unit: data.unit,
      email: data.email,
      competencies: [],
      learningHistory: [],
      evidences: []
    };

    this.participants.set(id, participant);
    return participant;
  }

  async updateParticipantCompetencies(id: string, competencies: ParticipantCompetency[]): Promise<Participant | undefined> {
    const participant = this.participants.get(id);
    if (!participant) return undefined;

    participant.competencies = competencies;
    this.participants.set(id, participant);
    return participant;
  }

  async deleteParticipant(id: string): Promise<boolean> {
    if (!this.participants.has(id)) return false;
    return this.participants.delete(id);
  }

  // Evidences
  async addEvidence(participantId: string, data: InsertEvidence): Promise<Evidence> {
    const participant = this.participants.get(participantId);
    if (!participant) throw new Error("Participant not found");

    const evidence: Evidence = {
      id: `ev-${randomUUID()}`,
      unitId: data.unitId,
      type: data.type,
      title: data.title,
      description: data.description,
      submittedAt: new Date().toISOString().split('T')[0],
      status: "pending"
    };

    participant.evidences.push(evidence);
    this.participants.set(participantId, participant);
    return evidence;
  }

  async updateEvidenceStatus(participantId: string, evidenceId: string, status: Evidence['status'], score?: number, feedback?: string): Promise<Evidence | undefined> {
    const participant = this.participants.get(participantId);
    if (!participant) return undefined;

    const evidence = participant.evidences.find(e => e.id === evidenceId);
    if (!evidence) return undefined;

    evidence.status = status;
    evidence.assessedAt = new Date().toISOString().split('T')[0];
    if (score !== undefined) evidence.score = score;
    if (feedback) evidence.feedback = feedback;

    this.participants.set(participantId, participant);
    return evidence;
  }

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    const participants = Array.from(this.participants.values());
    const courses = Array.from(this.courses.values());
    
    // Calculate stats
    const allCompetencies = participants.flatMap(p => p.competencies);
    const completedLearning = participants.flatMap(p => p.learningHistory.filter(l => l.status === 'completed'));
    const totalLearning = participants.flatMap(p => p.learningHistory);
    
    // Level distribution
    const levelCounts: Record<string, number> = { L1: 0, L2: 0, L3: 0, L4: 0 };
    allCompetencies.forEach(c => {
      levelCounts[c.currentLevel]++;
    });
    const totalComps = allCompetencies.length || 1;
    
    // Gap analysis
    const gapsByUnit: Record<string, { count: number; currentSum: number; targetSum: number }> = {};
    allCompetencies.filter(c => c.status === 'gap').forEach(c => {
      if (!gapsByUnit[c.unitId]) {
        gapsByUnit[c.unitId] = { count: 0, currentSum: 0, targetSum: 0 };
      }
      gapsByUnit[c.unitId].count++;
      gapsByUnit[c.unitId].currentSum += parseInt(c.currentLevel.replace('L', ''));
      gapsByUnit[c.unitId].targetSum += parseInt(c.targetLevel.replace('L', ''));
    });

    const competencyGaps = Object.entries(gapsByUnit)
      .map(([unitId, data]) => {
        const unit = this.units.get(unitId);
        const cluster = unit ? this.clusters.get(unit.clusterId) : undefined;
        return {
          unitId,
          unitName: unit?.name || unitId,
          clusterCode: (cluster?.code || 'SMAP') as 'SMAP' | 'PANCEK',
          gapCount: data.count,
          avgCurrentLevel: data.currentSum / data.count,
          avgTargetLevel: data.targetSum / data.count
        };
      })
      .sort((a, b) => b.gapCount - a.gapCount)
      .slice(0, 5);

    // Average level
    const avgLevel = allCompetencies.reduce((sum, c) => sum + parseInt(c.currentLevel.replace('L', '')), 0) / totalComps;

    return {
      totalParticipants: participants.length,
      totalCourses: courses.length,
      completionRate: totalLearning.length > 0 ? Math.round((completedLearning.length / totalLearning.length) * 100) : 0,
      averageLevel: Math.round(avgLevel * 10) / 10,
      competencyGaps,
      levelDistribution: [
        { level: 'L1', count: levelCounts.L1, percentage: Math.round((levelCounts.L1 / totalComps) * 100) },
        { level: 'L2', count: levelCounts.L2, percentage: Math.round((levelCounts.L2 / totalComps) * 100) },
        { level: 'L3', count: levelCounts.L3, percentage: Math.round((levelCounts.L3 / totalComps) * 100) },
        { level: 'L4', count: levelCounts.L4, percentage: Math.round((levelCounts.L4 / totalComps) * 100) }
      ]
    };
  }

  async getHeatmapData(): Promise<HeatmapData[]> {
    const participants = Array.from(this.participants.values());
    const units = Array.from(this.units.values());
    
    return units.map(unit => {
      const cluster = this.clusters.get(unit.clusterId);
      const competencies = participants.flatMap(p => p.competencies.filter(c => c.unitId === unit.id));
      
      return {
        unitId: unit.id,
        unitCode: unit.code,
        unitName: unit.name,
        clusterCode: (cluster?.code || 'SMAP') as 'SMAP' | 'PANCEK',
        l1Count: competencies.filter(c => c.currentLevel === 'L1').length,
        l2Count: competencies.filter(c => c.currentLevel === 'L2').length,
        l3Count: competencies.filter(c => c.currentLevel === 'L3').length,
        l4Count: competencies.filter(c => c.currentLevel === 'L4').length,
        total: competencies.length
      };
    });
  }
}

export const storage = new MemStorage();
