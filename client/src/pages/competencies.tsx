import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ChevronRight,
  Target,
  CheckCircle2,
  BookOpen,
  Layers
} from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getLevelColor, CompetencyLevelNames, CompetencyLevelDescriptions } from "@/lib/data";
import type { UnitCompetency, CompetencyCluster, CompetencyLevelType } from "@shared/schema";

function UnitCard({ unit, clusters }: { unit: UnitCompetency; clusters?: CompetencyCluster[] }) {
  const cluster = clusters?.find(c => c.id === unit.clusterId);
  
  return (
    <Card className="hover-elevate" data-testid={`unit-card-${unit.code.toLowerCase()}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Badge 
              variant="outline"
              className={cluster?.code === 'SMAP' 
                ? 'border-blue-500 text-blue-600 dark:text-blue-400 mb-2' 
                : 'border-teal-500 text-teal-600 dark:text-teal-400 mb-2'
              }
            >
              {unit.code}
            </Badge>
            <CardTitle className="text-lg">{unit.name}</CardTitle>
          </div>
          <Layers className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>{unit.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="indicators" className="border-none">
            <AccordionTrigger className="text-sm py-2 hover:no-underline">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>Indikator Perilaku</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                {unit.indicators.map((indicator) => (
                  <div key={indicator.level} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getLevelColor(indicator.level)}>
                        {indicator.level}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {CompetencyLevelNames[indicator.level as CompetencyLevelType]}
                      </span>
                    </div>
                    <ul className="space-y-1 pl-4">
                      {indicator.indicators.map((ind, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 mt-1 text-green-500 flex-shrink-0" />
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <Link href={`/courses?unit=${unit.id}`}>
            <Button variant="outline" size="sm" data-testid={`button-view-courses-${unit.code.toLowerCase()}`}>
              <BookOpen className="h-4 w-4 mr-1" />
              Lihat E-Course
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function LevelGuide() {
  return (
    <Card data-testid="card-level-guide">
      <CardHeader>
        <CardTitle className="text-lg">Panduan Level Kompetensi</CardTitle>
        <CardDescription>Framework 4 level untuk pengembangan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {(["L1", "L2", "L3", "L4"] as CompetencyLevelType[]).map((level) => (
            <div 
              key={level} 
              className="flex items-start gap-3 p-3 rounded-lg border border-border"
            >
              <Badge className={`${getLevelColor(level)} shrink-0`}>
                {level}
              </Badge>
              <div>
                <p className="font-medium text-sm">{CompetencyLevelNames[level]}</p>
                <p className="text-xs text-muted-foreground">{CompetencyLevelDescriptions[level]}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function UnitCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-20 mb-2" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-full" />
        <div className="mt-4 pt-4 border-t border-border">
          <Skeleton className="h-8 w-28" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Competencies() {
  const [activeTab, setActiveTab] = useState("all");

  const { data: clusters, isLoading: clustersLoading } = useQuery<CompetencyCluster[]>({
    queryKey: ['/api/clusters']
  });

  const { data: units, isLoading: unitsLoading } = useQuery<UnitCompetency[]>({
    queryKey: ['/api/units']
  });

  const isLoading = clustersLoading || unitsLoading;

  const smapUnits = units?.filter(u => u.clusterId === "cluster-smap") || [];
  const pancekUnits = units?.filter(u => u.clusterId === "cluster-pancek") || [];

  const displayUnits = activeTab === "smap" 
    ? smapUnits 
    : activeTab === "pancek" 
      ? pancekUnits 
      : units || [];

  return (
    <div className="p-6 space-y-6" data-testid="page-competencies">
      <div>
        <h1 className="text-2xl font-bold">Ekosistem Kompetensi</h1>
        <p className="text-muted-foreground">Jelajahi klaster dan unit kompetensi SMAP & PANCEK</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4" data-testid="tabs-cluster">
              <TabsTrigger value="all" data-testid="tab-all">Semua</TabsTrigger>
              <TabsTrigger value="smap" data-testid="tab-smap">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  SMAP
                </div>
              </TabsTrigger>
              <TabsTrigger value="pancek" data-testid="tab-pancek">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-teal-500" />
                  PANCEK
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {isLoading ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {[1, 2, 3, 4].map((i) => <UnitCardSkeleton key={i} />)}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {displayUnits.map((unit) => (
                    <UnitCard key={unit.id} unit={unit} clusters={clusters} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <LevelGuide />
          
          <Card data-testid="card-cluster-summary">
            <CardHeader>
              <CardTitle className="text-lg">Ringkasan Klaster</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {clustersLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                clusters?.map((cluster) => (
                  <div key={cluster.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: cluster.color }}
                      />
                      <span className="font-medium text-sm">{cluster.code}</span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-5">
                      {cluster.fullName}
                    </p>
                    <div className="flex items-center gap-1 pl-5 text-xs text-muted-foreground">
                      <ChevronRight className="h-3 w-3" />
                      {cluster.code === "SMAP" ? smapUnits.length : pancekUnits.length} Unit Kompetensi
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
