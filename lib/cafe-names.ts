// 맘카페 ID → 이름 매핑 (어드민 추적링크 관리에서 관리)
export const CAFE_NAMES: Record<string, string> = {
  cjsam: '순광맘',
  chobomamy: '러브양산맘',
  jinhaemam: '창원진해댁',
  momspanggju: '광주맘스팡',
  cjasm: '충주아사모',
  mygodsend: '화성남양애',
  yul2moms: '율하맘',
  chbabymom: '춘천맘',
  seosanmom: '서산맘',
  redog2oi: '부천소사구',
  ksn82599: '둔산맘',
};

export function resolveCafeName(cafeId: string): string {
  return CAFE_NAMES[cafeId] || cafeId;
}

// click_source (예: "맘카페_cjsam") → 읽기 좋은 문자열 반환
export function formatClickSource(clickSource: string | null): string {
  if (!clickSource) return '미입력';
  const stripped = clickSource.startsWith('바로폼_') ? clickSource.slice(4) : clickSource;
  const idx = stripped.indexOf('_');
  if (idx === -1) return stripped;
  const major = stripped.slice(0, idx);
  const rawMinor = stripped.slice(idx + 1);
  const minor = resolveCafeName(rawMinor);
  return `${major} > ${minor}`;
}
