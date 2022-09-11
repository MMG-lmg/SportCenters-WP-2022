package service;

import java.util.Collection;

public interface InterfaceBase<T> {
	public Collection<T> getAll();
	public T getById(String id);
	public void create(T item);
	public void delete(String id);
	public void update(String id,T item);
	public String generateId();
	public boolean isIdUnique(String id);
}
