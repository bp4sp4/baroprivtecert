import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

// GET: 채널 목록 조회
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  const query = supabaseAdmin
    .from('channels')
    .select('*')
    .order('created_at', { ascending: true });

  if (type) query.eq('type', type);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

// POST: 채널 추가
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, name, type = 'mamcafe' } = body;

  if (!id || !name) {
    return NextResponse.json({ error: 'id와 name은 필수입니다.' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('channels')
    .insert([{ id, name, type }])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: '이미 존재하는 카페 ID입니다.' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}

// DELETE: 채널 삭제
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'id가 필요합니다.' }, { status: 400 });

  const { error } = await supabaseAdmin.from('channels').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
