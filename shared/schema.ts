import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Competency Level enum
export const CompetencyLevel = {
  L1: "L1",
  L2: "L2", 
  L3: "L3",
  L4: "L4"
} as const;

export type CompetencyLevelType = keyof typeof CompetencyLevel;

export const CompetencyLevelNames: Record<CompetencyLevelType, string> = {
  L1: "Awareness",
  L2: "Application",
  L3: "Mastery",
  L4: "Strategic"
};

export const CompetencyLevelDescriptions: Record<CompetencyLevelType, string> = {
  L1: "Memahami konsep dasar",
  L2: "Menerapkan secara mandiri",
  L3: "Konsisten & optimal",
  L4: "Mengarahkan & membina"
};

// Competency Cluster - Generic (not limited to specific types)
export interface CompetencyCluster {
  id: string;
  code: string;
  name: string;
  fullName: string;
  description: string;
  color: string;
}

// Insert schema for cluster
export const insertClusterSchema = z.object({
  code: z.string().min(1, "Kode cluster wajib diisi").max(10, "Kode maksimal 10 karakter"),
  name: z.string().min(1, "Nama cluster wajib diisi"),
  fullName: z.string().min(1, "Nama lengkap wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  color: z.string().min(1, "Warna wajib diisi")
});

export type InsertCluster = z.infer<typeof insertClusterSchema>;

// Insert schema for unit competency
export const insertUnitSchema = z.object({
  clusterId: z.string().min(1, "Cluster wajib dipilih"),
  code: z.string().min(1, "Kode unit wajib diisi"),
  name: z.string().min(1, "Nama unit wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  indicators: z.array(z.object({
    level: z.enum(["L1", "L2", "L3", "L4"]),
    indicators: z.array(z.string())
  })).optional()
});

export type InsertUnit = z.infer<typeof insertUnitSchema>;

// Unit Competency
export interface UnitCompetency {
  id: string;
  clusterId: string;
  code: string;
  name: string;
  description: string;
  indicators: BehaviorIndicator[];
}

// Behavior Indicator per level
export interface BehaviorIndicator {
  level: CompetencyLevelType;
  indicators: string[];
}

// E-Course structure
export interface ECourse {
  id: string;
  unitId: string;
  targetLevel: CompetencyLevelType;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
  createdAt: string;
}

export interface Lesson {
  id: string;
  order: number;
  type: "orientation" | "context" | "microlearning" | "practice" | "assessment" | "reflection";
  title: string;
  description: string;
  content: string;
  activities?: Activity[];
}

export interface Activity {
  id: string;
  type: "video" | "reading" | "case_study" | "worksheet" | "project" | "discussion" | "quiz";
  title: string;
  description: string;
  duration: string;
}

// Participant / Peserta
export interface Participant {
  id: string;
  nip: string;
  name: string;
  position: string;
  unit: string;
  email: string;
  competencies: ParticipantCompetency[];
  learningHistory: LearningRecord[];
  evidences: Evidence[];
}

export interface ParticipantCompetency {
  unitId: string;
  currentLevel: CompetencyLevelType;
  targetLevel: CompetencyLevelType;
  lastAssessed: string;
  status: "gap" | "on_track" | "achieved";
}

export interface LearningRecord {
  id: string;
  courseId: string;
  startedAt: string;
  completedAt?: string;
  progress: number;
  status: "not_started" | "in_progress" | "completed";
}

export interface Evidence {
  id: string;
  unitId: string;
  type: "document" | "video" | "presentation" | "reflection";
  title: string;
  description: string;
  fileUrl?: string;
  submittedAt: string;
  assessedAt?: string;
  assessorId?: string;
  score?: number;
  feedback?: string;
  status: "pending" | "reviewed" | "approved" | "needs_revision";
}

// Assessment
export interface Assessment {
  id: string;
  participantId: string;
  unitId: string;
  targetLevel: CompetencyLevelType;
  assessorId: string;
  assessorName: string;
  evidenceIds: string[];
  rubricScores: RubricScore[];
  overallScore: number;
  result: "pass" | "fail" | "pending";
  feedback: string;
  assessedAt: string;
}

export interface RubricScore {
  indicatorId: string;
  indicator: string;
  score: number;
  maxScore: number;
  notes: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalParticipants: number;
  totalCourses: number;
  completionRate: number;
  averageLevel: number;
  competencyGaps: CompetencyGap[];
  levelDistribution: LevelDistribution[];
}

export interface CompetencyGap {
  unitId: string;
  unitName: string;
  clusterCode: string;
  gapCount: number;
  avgCurrentLevel: number;
  avgTargetLevel: number;
}

export interface LevelDistribution {
  level: CompetencyLevelType;
  count: number;
  percentage: number;
}

// Heatmap data
export interface HeatmapData {
  unitId: string;
  unitCode: string;
  unitName: string;
  clusterCode: string;
  l1Count: number;
  l2Count: number;
  l3Count: number;
  l4Count: number;
  total: number;
}

// Insert schemas for forms
export const insertParticipantSchema = z.object({
  nip: z.string().min(1, "NIP wajib diisi"),
  name: z.string().min(1, "Nama wajib diisi"),
  position: z.string().min(1, "Jabatan wajib diisi"),
  unit: z.string().min(1, "Unit kerja wajib diisi"),
  email: z.string().email("Email tidak valid")
});

export type InsertParticipant = z.infer<typeof insertParticipantSchema>;

export const insertEvidenceSchema = z.object({
  unitId: z.string().min(1, "Unit kompetensi wajib dipilih"),
  type: z.enum(["document", "video", "presentation", "reflection"]),
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi")
});

export type InsertEvidence = z.infer<typeof insertEvidenceSchema>;

export const insertCourseSchema = z.object({
  unitId: z.string().min(1, "Unit kompetensi wajib dipilih"),
  targetLevel: z.enum(["L1", "L2", "L3", "L4"]),
  title: z.string().min(1, "Judul kursus wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  duration: z.string().min(1, "Durasi wajib diisi")
});

export type InsertCourse = z.infer<typeof insertCourseSchema>;

// Legacy user schema (keeping for compatibility)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
