import { useState } from 'react';
import { useRecoilState } from 'recoil';
import ChatingRoom from '@/organism/ChatingRoom';
import { fetcher } from '@/hooks/fetcher';
import SideBarLayout from '@/molecule/SideBarLayout';
import { useQuery, useMutation } from '@tanstack/react-query';
import SectionList from '@/molecule/SectionList';
import {RoomInfo, roomInfoState} from "@/states/roomInfoState";

function useAllRooms() {
  const result = useQuery({
    queryKey: ['chat/rooms/all'],
    queryFn: async (): Promise<RoomInfo[]> => {
      const res = await fetcher('/chat/rooms/all');
      if (res.ok) {
        const data = await res.json();
        return data.rooms;
      }
      return [];
    },
  });
  return result;
}

function useJoinedRooms() {
  const result = useQuery({
    queryKey: ['chat/rooms/joined'],
    queryFn: async (): Promise<RoomInfo[]> => {
      const res = await fetcher('/chat/rooms/joined');
      if (res.ok) {
        const data = await res.json();
        return data.rooms;
      }
      return [];
    },
  });
  return result;
}

const Chat = () => {
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState); //room_id need to be null when user is not in any room
  const { data: allRooms } = useAllRooms();
  const { data: joinedRooms } = useJoinedRooms();

  const section = [
    {
      title: 'all',
      list: allRooms ?? [],
    },
    {
      title: 'joined',
      list: joinedRooms ?? [],
    },
  ];
  const mutation = useMutation({
    mutationFn: async (room: RoomInfo) => {
      return fetcher(`/chat/room/${room.room_id}/join`, {
        method: 'POST',
        body: JSON.stringify({ room_password: '' }),
      });
    },
    onSettled: (_data, _error, variables) => {
      setRoomInfo(variables ?? null);
    },
  });

  return (
    <SideBarLayout>
      {roomInfo ? (
        <ChatingRoom roomInfo={roomInfo} close={() => setRoomInfo(null)} />
      ) : (
        <>
          <AddChatRoom />
          <SectionList
            sections={section}
            renderItem={(room) => (
              <button onClick={() => mutation.mutate(room)}>
                {room.room_name}
              </button>
            )}
            keyExtractor={(room) => room.room_id}
          />
        </>
      )}
    </SideBarLayout>
  );
};

function AddChatRoom() {
  const addChatRoom = useMutation({
    mutationFn: (event: React.FormEvent<HTMLFormElement>) => {
      const f = event.target;

      event.preventDefault();
      return fetcher('/chat/room', {
        method: 'POST',
        body: JSON.stringify({
          room_name: f.room_name.value,
          room_access: f.room_access.value,
          room_password: f.room_password.value,
        }),
      });
    },
  });

  return (
    <form
      className="flex h-fit w-full shrink-0 flex-row items-center border-b border-neutral-400 bg-neutral-800"
      onSubmit={addChatRoom.mutate}
    >
      <button className="px-2" type="submit">
        +
      </button>
      <div className="flex w-min flex-col items-center bg-neutral-800">
        <input
          className="w-min border-b-4 border-white bg-inherit"
          name="room_name"
          type="text"
          required
        />
        <div className="flex flex-row space-y-3 text-xs">
          <input
            className="w-min border-b-4 border-white bg-inherit"
            name="room_access"
            value="public"
            type="radio"
          />
          <label htmlFor="public">public</label>
          <input
            className="w-min border-b-4 border-white bg-inherit"
            name="room_access"
            value="protected"
            type="radio"
          />
          <label htmlFor="protected">protected</label>
          <input
            className="w-min border-b-4 border-white bg-inherit"
            name="room_access"
            value="private"
            type="radio"
          />
          <label htmlFor="private">private</label>
        </div>
        <input
          className="w-min border-b-4 border-white bg-inherit"
          name="room_password"
          type="password"
        />
      </div>
    </form>
  );
}

export default Chat;
